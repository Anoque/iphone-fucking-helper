import { Component, OnInit } from '@angular/core';
import { NetService } from '../shared/net/net.service';
import { Article } from '../../main';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  articles: Article[];

  constructor(private netService: NetService) {
    this.articles = [];
  }

  ngOnInit(): void {
    this.netService.getRequest('articles/').subscribe((res: any) => {
      if (res) {
        this.articles = res;
      }
    });
  }

}
