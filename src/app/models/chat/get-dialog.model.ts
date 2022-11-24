export interface GetDialogModel {
  messages: MessageOutput[];
  readonly count: number;
  dialogState?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  chatItemName?: string;
  dateStartDialog?: string;
  dialogId: number;
  url?: string;
}

interface MessageOutput {
  message?: string;
  dialogId?: number;
  created?: string;
  userId?: string;
  isMyMessage: boolean;
}
