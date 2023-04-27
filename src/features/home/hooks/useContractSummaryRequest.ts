import { OpenAiOnSuccessType, useOpenAiRequest } from "@keiyomi/hooks";

type ApiRequestType = {
  message: string;
  onSuccess?: ({ data, chatMessage }: OpenAiOnSuccessType) => void;
};

type ReturnType = {
  doSummaryRequest: ({ message, onSuccess }: ApiRequestType) => void;
  isChatRequesting: boolean;
};

const systemMessage = `
* あなたは与えられたテキストを10歳の子どもにもわかる言葉で説明してください
* 子供たちが理解しやすいような簡単な短い日本語で話してください
* 敬語ではなく話し言葉を使ってください
`;

export const useContractSummaryRequest = (
  currentEmployeeId: string
): ReturnType => {
  const { openAiRequest, isChatRequesting } =
    useOpenAiRequest(currentEmployeeId);

  const doSummaryRequest = ({ message, onSuccess }: ApiRequestType) => {
    openAiRequest({
      prompt: message,
      systemMessage,
      onSuccess,
    });
  };

  return {
    doSummaryRequest,
    isChatRequesting,
  };
};
