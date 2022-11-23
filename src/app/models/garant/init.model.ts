export interface InitModel {
  mainHeaders?: string[];
  dopHeaders?: string[];
  dealId: number;
  blockLeftTitle?: string;
  blockRightTitle?: string;
  fullName?: string;
  role?: string;
  otherUserFullName?: string;
  otherUserRole?: string;
  blockLeftSumTitle?: string;
  blockRightSumTitle?: string;
  blockRightStatusTitle?: string;
  blockRightStatusText?: string;
  totalAmount?: string;
  mainItemTitle?: string;
  itemTitle?: string;
  imageUrl?: string;
  documentBlockTitle?: string;
  documentsNames?: string;
  blackBlockTitle?: string;
  blackBlockText?: string;
  blackBlueButtonText?: string;
  blackButtonText?: string;
  continueButtonText?: string;
  isLast: boolean;
  buttonActionText?: string;
  amount: number;
  buttonCancel?: string;
  blockDocumentsTemplatesName?: string;
  blockDocumentsTemplatesDetail?: string;
  blockDocumentsTemplatesFileNames?: string;
  blockDocumentDealName?: string;
  blockDocumentDealFileNames?: string;
  itemDealId: number;
  itemDealType?: string;
  otherId?: string;
  chatData: GetResultMessageOutput;
  investInclude?: string;
  iterationList?: ConvertInvestIncludePriceOutput[];
  contractTitle?: string;
  contractDetail?: string;
  contractText?: string;
  buttonActionTextContract?: string;
  blockCustomerComment?: string;
  buttonApproveDocumentText?: string;
  buttonRejectDocumentText?: string;
  isOwner: boolean;
  dateStartDeal?: string;
}

interface GetResultMessageOutput {
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

interface ConvertInvestIncludePriceOutput {
  name?: string;
  items?: string[];
  price: number;
}
