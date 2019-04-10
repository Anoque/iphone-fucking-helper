import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

export interface ResponseData {
  data: any;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetService {
  private token: string;

  constructor(private http: HttpClient) {
    this.setToken('');
  }

  sendRequest(url: string, data: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (this.getToken().length > 0) {
      data['token'] = this.getToken();
    }

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


  getToken(): string {
    return this.token;
  }

  setToken(value: string): void {
    this.token = value;
  }
}
