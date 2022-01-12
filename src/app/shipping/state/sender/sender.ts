import { SenderInterface } from "./sender.interface";

export function senderInfo(sender:SenderInterface){
  return {
    ...sender
  } as SenderInterface;
}
