import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SelectListInterface } from '../state/shipping.interface';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly baseUrl:Required<string> = environment.baseUrl;

  constructor(
    private http:HttpClient
  ) { }

  get_countries():Observable<SelectListInterface[]>{
    return this.http.get<SelectListInterface[]>(`${this.baseUrl}/api/v1/country/selectlist`);
  }
}
