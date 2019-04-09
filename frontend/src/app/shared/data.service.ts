import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  static getDateString(date: Date, time: boolean = false): string {
    let result: string =
      date.getFullYear() + '-'
      + ((date.getMonth() < 9) ? '0' : '')
      + (date.getMonth() + 1) + '-'
      + ((date.getDay()) ? '0' : '') + date.getDay();

    if (time) {
      result += ' '
        + ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':'
        + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':'
        + ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds();
    }
    return result;
  }
}
