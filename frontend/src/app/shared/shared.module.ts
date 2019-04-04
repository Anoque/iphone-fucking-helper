import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetService } from './net/net.service';

@NgModule({
  imports: [
    CommonModule,
    NetService
  ],
  declarations: []
})
export class SharedModule { }
