import { CourierInterface } from "../  courier/courier.interface";
import { ReceiverInterface } from "../receiver/receiver.interface";
import { SenderInterface } from "../sender/sender.interface";

export interface ParcelDetailsInterface{
  width: number;
  length: number;
  height: number;
  weight: number;
}
export interface CartInterface{
  sender: SenderInterface,
  receiver:ReceiverInterface,
  courier:CourierInterface,
}
