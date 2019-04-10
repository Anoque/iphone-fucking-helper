import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { RouterModule } from '@angular/router';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';


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
    ArticlesListComponent
  ],
})
export class ArticlesModule { }
