import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhoneCodeSelectListInterface, SelectListInterface } from '../state/shipping.interface';
import { tap, map } from 'rxjs/operators';
import { CourierInterface, CourierParamsInterface } from '../state/  courier/courier.interface';
import { SenderInterface } from '../state/sender/sender.interface';
import { UploadProofInterface } from '../state/upload/upload-proof.interface';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly baseUrl: Required<string> = environment.baseUrl;
  readonly mediaBaseUrl: Required<string> = environment.mediaBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  get_countries(): Observable<SelectListInterface[]> {
    return this.http.get<SelectListInterface[]>(`${this.baseUrl}/api/v1/country/selectlist`);
  }

  get_CourierServicesOption(params: CourierParamsInterface): Observable<CourierInterface[]> {
    const _params = this.extractParams(params);
    return this.http.get<CourierInterface[]>(`${this.baseUrl}/api/v1/ratecard/bypostcode`, { params: _params });
  }


  private extractParams(params: CourierParamsInterface): HttpParams {
    let _param: HttpParams = new HttpParams()
      .set("ProductId", params.ProductId)

    if (params.PackageTypeId != undefined) {
      _param = _param.set("PackageTypeId", params.PackageTypeId)
    }
    if (params.ServiceTypeId != undefined) {
      _param = _param.set("ServiceTypeId", params.ServiceTypeId)
    }
    if (params.Weight != undefined) {
      _param = _param.set("Weight", params.Weight)
    }
    if (params.CountryFrom != undefined) {
      _param = _param.set("CountryFrom", params.CountryFrom)
    }
    if (params.PostcodeFrom != undefined) {
      _param = _param.set("PostcodeFrom", params.PostcodeFrom)
    }
    if (params.CountryTo != undefined) {
      _param = _param.set("CountryTo", params.CountryTo)
    }
    if (params.PostcodeTo != undefined) {
      _param = _param.set("PostcodeTo", params.PostcodeTo)
    }
    return _param;
  }

  post_sendParcel(data:SenderInterface[]):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/v1/public/parcel/send`, data);
  }
  get_phoneCodes(): Observable<PhoneCodeSelectListInterface[]> {
    return this.http.get<PhoneCodeSelectListInterface[]>(`${this.baseUrl}/api/v1/country/selectlist/phone`);
  }

  post_uploadProof(data:UploadProofInterface):Observable<any>{
    return this.http.post<any>(`${this.mediaBaseUrl}/upload`, data);
  }
}
