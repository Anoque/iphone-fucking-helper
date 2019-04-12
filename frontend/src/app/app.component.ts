import { Component, OnInit } from '@angular/core';
import { NetService } from './shared/net/net.service';

export class MenuItem {
  name: string;
  url: string;
  admin: boolean;
  unAuth: boolean;

  constructor(name?: string, url?: string, admin?: boolean, unAuth?: boolean) {
    this.name = name;
    this.url = url;
    this.admin = admin;
    this.unAuth = unAuth;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menu: MenuItem[];

  constructor(public netService: NetService) {
    this.menu = [
      new MenuItem('Main page', '/'),
      new MenuItem('Articles list', '/articles', true),
      new MenuItem('Article add', '/articles/add', true),
      new MenuItem('Sign on', '/auth', false, true),
    ];
  }

  ngOnInit(): void { }
}
