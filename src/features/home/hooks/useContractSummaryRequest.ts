import { OpenAiOnSuccessType, useOpenAiRequest } from "@keiyomi/hooks";

type ApiRequestType = {
  message: string;
  onSuccess?: ({ data, chatMessage }: OpenAiOnSuccessType) => void;
};

type ReturnType = {
  doSummaryRequest: ({ message, onSuccess }: ApiRequestType) => void;
  isChatRequesting: boolean;
};

export const useContractSummaryRequest = (
  currentEmployeeId: string
): ReturnType => {
  const { openAiRequest, isChatRequesting } =
    useOpenAiRequest(currentEmployeeId);

  const doSummaryRequest = ({ message, onSuccess }: ApiRequestType) => {
    openAiRequest({
      prompt: message,
      systemMessage:
        "あなたは与えられたテキストを10歳の子どもにもわかる言葉で説明するAIです。",
      onSuccess,
    });
  };

  return {
    doSummaryRequest,
    isChatRequesting,
  };
};
