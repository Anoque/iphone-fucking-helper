import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

export class ResponseData {
  data: any;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetService {

  constructor(private http: HttpClient) { }

  sendRequest(data): Observable<ResponseData> {
    return this.http.post(environment.backendUrl, JSON.stringify(data)).pipe(map((val: ResponseData) => {
      if (!val.error) {
        return val.data;
      } else {
        console.log(val.error);
        return false;
      }
    }));
  }

  getRequest(url: string): Observable<ResponseData> {
    return this.http.get(environment.backendUrl + url).pipe(map((val: ResponseData) => {
      if (!environment.production) {
        console.log(val);
      }

      if (val.error.length === 0) {
        return val.data;
      } else {
        console.log(val.error);
        // Will be message about error

        return false;
      }
    }));
  }
}
