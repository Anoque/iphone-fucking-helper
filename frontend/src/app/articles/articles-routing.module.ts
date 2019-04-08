import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import {ArticlesListComponent} from './articles-list/articles-list.component';

const routes: Routes = [
  { path: 'articles', children: [
      { path: '', component: ArticlesListComponent },
      { path: 'add', component: ArticleFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ArticlesRoutingModule { }
