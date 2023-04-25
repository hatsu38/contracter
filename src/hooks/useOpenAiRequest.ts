import {
  ChatCompletionResponseMessage,
  Configuration,
  CreateChatCompletionResponse,
  OpenAIApi,
} from "openai";
import { toast } from "react-toastify";

import { useBoolean } from "@keiyomi/hooks";

type OnSuccessType = {
  chatMessage: ChatCompletionResponseMessage;
  data: CreateChatCompletionResponse;
};

type OpenAIRequestType = {
  prompt: string;
  systemMessage?: string;
  alreadyMessages?: ChatCompletionResponseMessage[];
  onSuccess?: ({ data, chatMessage }: OnSuccessType) => void;
  onError?: (error: Error) => void;
};

type ReturnType = {
  openAiRequest: ({
    prompt,
    systemMessage,
    alreadyMessages,
    onSuccess,
    onError,
  }: OpenAIRequestType) => Promise<void>;
  isChatRequesting: boolean;
};

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const useOpenAiRequest = (authUserName: string): ReturnType => {
  const openai = new OpenAIApi(configuration);
  const { isChecked: isChatRequesting, setTrue, setFalse } = useBoolean(false);

  const openAiRequest = async ({
    prompt,
    systemMessage,
    alreadyMessages = [],
    onSuccess,
    onError,
  }: OpenAIRequestType) => {
    setTrue();
    const messages: ChatCompletionResponseMessage[] = [
      ...alreadyMessages,
      { role: "user", content: prompt },
    ];
    if (systemMessage) {
      messages.unshift({
        role: "system",
        content: systemMessage,
      });
    }
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        user: authUserName,
        max_tokens: 2048,
      });
      setFalse();
      const message = completion.data.choices.at(-1)?.message;
      if (!message) {
        throw new Error("メッセージがありません");
      }
      onSuccess &&
        onSuccess({
          data: completion.data,
          chatMessage: message,
        });
    } catch (error) {
      setFalse();
      if (error instanceof Error) {
        onError && onError(error);
        toast.error(error.message);
      } else {
        toast.error("エラーが発生しました");
      }
    }
  };

  return {
    openAiRequest,
    isChatRequesting,
  };
};
