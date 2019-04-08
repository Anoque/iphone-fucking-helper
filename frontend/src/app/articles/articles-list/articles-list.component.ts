import { Component, OnInit } from '@angular/core';
import {NetService} from '../../shared/net/net.service';
import {Router} from '@angular/router';

export class Article {
  id: number;
  title: string;
  date: string;
}

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[];

  constructor(private netService: NetService, private router: Router) {
    this.articles = [];
  }

  ngOnInit() {
    this.netService.getRequest('articles/').subscribe((res: any) => {
      if (res) {
        this.articles = res;
      }
    });
  }

}
