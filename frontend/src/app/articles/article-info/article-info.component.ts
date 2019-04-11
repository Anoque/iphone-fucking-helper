import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NetService} from '../../shared/net/net.service';
import { ArticleRelation } from '../../main-page/main-page.component';
import { Article } from '../articles-list/articles-list.component';

export interface ArticlePage {
  article: Article;
  relations: ArticleRelation;
}

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css']
})
export class ArticleInfoComponent implements OnInit {
  id: number;
  data: ArticlePage;

  constructor(private route: ActivatedRoute, private netService: NetService) {
    this.id = null;
  }

  ngOnInit() {
    this.route.params.subscribe((value) => {
      this.id = +value.id;
      this.netService.getRequest('articles/get_article/' + this.id + '/', true).subscribe((res) => {
        this.data = res.data;
        console.log(this.data);
      });
    });
  }

}
