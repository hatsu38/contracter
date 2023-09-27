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
* You are to explain the given text in terms that a 10 year old "child can understand".
* Summarize the text in "simple" and "short" Japanese that is "easy" for children to "understand".
* Please make your summary in bullet points.
* Use spoken language, not honorifics.
* Please explain each clause in a way that children can understand.
* Use h2 tags for headings for each clause
* Enclose each clause in a p tag
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
