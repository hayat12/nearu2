import { CartInterface, ParcelDetailsInterface, SendParcel } from "./parcels.interface";

export function parcelDetails(parcelDetails: ParcelDetailsInterface) {
  return {
    ...parcelDetails
  } as ParcelDetailsInterface;
}

export function sendParcelData(carts: CartInterface[]): SendParcel[] {
  return carts.map((o) => {
    return {
      orderReference: o.parcel_details.orderReference,
      width: o.parcel_details.width,
      length: o.parcel_details.length,
      height: o.parcel_details.height,
      weight: o.parcel_details.weight,

      shipperName: o.sender.shipperName,
      shipperContact: o.sender.shipperPhoneCode+""+o.sender.shipperContact,
      shipperPhoneCode: o.sender.shipperPhoneCode,
      shipperEmail: o.sender.shipperEmail,
      shipperAddress1: o.sender.shipperAddress1,
      shipperAddress2: o.sender.shipperAddress2,
      shipperCity: o.sender.shipperCity,
      shipperPostcode: o.sender.shipperPostcode,
      shipperState: o.sender.shipperState,
      shipperCountryCode: o.sender.shipperCountryCode,

      receiverName: o.receiver.receiverName,
      receiverContact: o.receiver.receiverPhoneCode+""+o.receiver.receiverContact,
      receiverPhoneCode: o.receiver.receiverPhoneCode,
      receiverEmail: o.receiver.receiverEmail,
      receiverAddress1: o.receiver.receiverAddress1,
      receiverAddress2: o.receiver.receiverAddress2,
      receiverCity: o.receiver.receiverCity,
      receiverPostcode: o.receiver.receiverPostcode,
      receiverState: o.receiver.receiverState,
      receiverCountryCode: o.receiver.receiverCountryCode,
      courierId: o.courier.businessId,
      chargeLines:
      [
        {
          productId: "H2D",
          unitAmount: o.courier.amount,
          unitTaxAmount: o.courier.taxAmount,
          quantity: 1
        }
      ]
    };
  });
}
