import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleInfoComponent } from './article-info/article-info.component';

const routes: Routes = [
  { path: 'articles', children: [
      { path: '', component: ArticlesListComponent },
      { path: 'add', component: ArticleFormComponent },
      { path: 'edit:id', component: ArticleFormComponent },
      { path: ':id', component: ArticleInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ArticlesRoutingModule { }
