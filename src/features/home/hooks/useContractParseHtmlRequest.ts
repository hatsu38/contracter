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
* あなたは与えられたテキストをHTMLに変換してください
* 見出しをh2タグで囲んでください
* それぞれの条項をpタグで囲んでください
`;

export const useContractParseHtmlRequest = (
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
