import {Component, OnInit} from '@angular/core';
import {NetService, ResponseData} from './shared/net/net.service';

export class Article {
  id: number;
  title: string;
  date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
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
