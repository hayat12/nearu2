import { UploadProofENUM } from "../shipping.enum";

export interface UploadProofInterface{
  fileFormat: string,
  fileName: string,
  fileData: string,
  uploadType: UploadProofENUM,
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number
}
