import { ParcelDetailsInterface } from "./parcels.interface";

export function parcelDetails(parcelDetails:ParcelDetailsInterface){
  return {
    ...parcelDetails
  } as ParcelDetailsInterface;
}
