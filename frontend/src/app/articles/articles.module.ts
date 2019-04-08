import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import {MaterialModule} from '../shared/material/material.module';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesRoutingModule} from './articles-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [ArticleFormComponent, ArticlesListComponent]
})
export class ArticlesModule { }
