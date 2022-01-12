import { ReceiverInterface } from "./receiver.interface";

export function receiverInfo(receiver:ReceiverInterface){
  return {
    ...receiver
  } as ReceiverInterface;
}
