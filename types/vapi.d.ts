//! enums
//* this describe the overall structure of the message comming from vapi
enum MessageTypeEnum {
  TRANSCRIPT = "transcript", // Speech-to-text result
  FUNCTION_CALL = "function-call", // App logic being triggered
  FUNCTION_CALL_RESULT = "function-call-result", // Result of a function
  ADD_MESSAGE = "add-message", // Add a custom message (UI only)
}

//* this enum describe who is sending transcript message
enum MessageRoleEnum {
  USER = "user", // You (the speaker)
  SYSTEM = "system", // Internal system message
  ASSISTANT = "assistant", // The AI or bot
}

//* this enum describe the completion of transcript
enum TranscriptMessageTypeEnum {
  PARTIAL = "partial", // Not yet finalized
  FINAL = "final", // Final version of speech-to-text
}

//! interfaces
//* All other message types will “extend” this.
interface BaseMessage {
  type: MessageTypeEnum;
}

interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}

interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

type Message =
  | TranscriptMessage
  | FunctionCallMessage
  | FunctionCallResultMessage;
