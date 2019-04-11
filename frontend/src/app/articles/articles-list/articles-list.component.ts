import { Component, OnInit } from '@angular/core';
import {NetService} from '../../shared/net/net.service';
import {Router} from '@angular/router';

export interface Article {
  id: number;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[];
  error: string;

  constructor(private netService: NetService, private router: Router) {
    this.articles = [];
    this.error = '';
  }

  ngOnInit() {
    this.netService.getRequest('articles/').subscribe((res: any) => {
      this.articles = res;
    }, err => {
      this.error = err.message;
    });
  }

  remove(i: number): void {
    const data = {
      'id': this.articles[i].id
    };
    this.netService.sendRequest('articles/delete/', data).subscribe((res) => {
      if (res.status) {
        this.articles.splice(i, 1);
      }
    });
  }
}
