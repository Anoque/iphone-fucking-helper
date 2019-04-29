import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetService } from '../../shared/net/net.service';
import { Article } from '../articles-list/articles-list.component';

export interface ArticlePage {
  article: Article;
  children: Article[];
  parents: Article[];
}

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css']
})
export class ArticleInfoComponent implements OnInit {
  @Input() id: number;
  data: ArticlePage;
  opened: boolean[];

  constructor(private route: ActivatedRoute, private netService: NetService, private router: Router) {
    this.id = null;
    this.opened = [];
  }

  ngOnInit() {
    if (this.id == null) {
      this.route.params.subscribe((value) => {
        this.id = +value.id;
        this.loadData();
      });
    } else {
      this.loadData();
    }
  }

  loadData(): void {
    this.netService.getRequest('articles/get/' + this.id + '/', true).subscribe((res) => {
      this.data = res.data;
    });
  }

  toArticleInfoPage(i: number): void {
    this.router.navigate(['articles/' + this.data.children[i].id]);
  }

}
