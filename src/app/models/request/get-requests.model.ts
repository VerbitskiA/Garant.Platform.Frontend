export interface GetRequestsModel {
  requestId: number;
  requestItemId: number;
  userId: string;
  requestType?: string;
  notifyTitle?: string;
  notifyDescription?: string;
  requestStatus?: string;
}
