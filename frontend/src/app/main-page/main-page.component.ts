import { Component, OnInit } from '@angular/core';
import {NetService} from '../shared/net/net.service';

export class Article {
  id: number;
  title: string;
  date: string;
}


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

  addArticle() {
    const temp = new Article();
    temp.id = this.articles.length + 1;
    temp.title = 'Added';
    temp.date = new Date().toDateString();
    this.articles.push(temp);
  }

}
