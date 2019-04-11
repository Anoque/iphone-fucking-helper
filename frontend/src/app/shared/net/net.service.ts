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

  sendRequest(url: string, data: any, full: boolean = false): Observable<any> {
    return this.http.post(environment.backendUrl + url, JSON.stringify(data), this.getHeaders()).pipe(
      map((val: any) => {
        if (!environment.production) {
          console.log(val);
        }

        if (val.data && !val.error) {
          return (full) ? val : val.data;
        }

        return val;
      })
    );
  }

  getHeaders() {
    if (this.getToken().length > 0) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.getToken()
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }
  }

  getRequest(url: string, full: boolean = false): Observable<ResponseData> {
    return this.http.get(environment.backendUrl + url, this.getHeaders()).pipe(map((val: ResponseData) => {
      if (!environment.production) {
        console.log(val);
      }

      if (val.error.length === 0) {
        return (full) ? val : val.data;
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
