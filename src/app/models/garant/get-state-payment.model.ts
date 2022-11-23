export interface GetStatePaymentModel {
  success: boolean;
  status?: string;
  paymentId?: string;
  orderId?: string;
  amount?: string;
  isPay: boolean;
  iteration: number;
}
