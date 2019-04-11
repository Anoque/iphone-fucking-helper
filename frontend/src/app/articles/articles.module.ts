import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { RouterModule } from '@angular/router';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleInfoComponent } from './article-info/article-info.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ArticleFormComponent,
    ArticlesListComponent,
    ArticleInfoComponent
  ],
})
export class ArticlesModule { }
