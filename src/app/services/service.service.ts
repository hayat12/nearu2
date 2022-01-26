import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  readonly baseUrl: Required<string> = environment.baseUrl;
  readonly mediaBaseUrl: Required<string> = environment.mediaBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  post_uploadProof(data:any):Observable<any>{
    const header = new HttpHeaders().set(
      "Content-Type", "application/json"
    );
    return this.http.post<any>(`${this.mediaBaseUrl}/upload`, data, {headers: header});
  }
}
