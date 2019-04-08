import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  sendRequest(url: string, data: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(environment.backendUrl + url, JSON.stringify(data), options).pipe(
      map((val: any) => {
        if (!environment.production) {
          console.log(val);
        }

        if (val.data && !val.error) {
          return val.data;
        }

        return val;
      })
    );
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

        return false;
      }
    }));
  }
}
