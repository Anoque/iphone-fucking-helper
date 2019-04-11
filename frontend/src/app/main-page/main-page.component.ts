import { Component, OnInit } from '@angular/core';
import { NetService } from '../shared/net/net.service';
import {Router} from '@angular/router';

export interface ArticleRelation {
  parent: number;
  relation: number;
  article_title: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  posts: ArticleRelation[];

  constructor(private netService: NetService, private router: Router) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.netService.getRequest('articles/get_posts_by_id/0/', true).subscribe((res) => {
      this.posts = res.data;
    });
  }

  openArticle(id: number) {
    this.router.navigate(['articles', id]);
  }
}
