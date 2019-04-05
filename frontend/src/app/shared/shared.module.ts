import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetService } from './net/net.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NetService
  ]
})
export class SharedModule { }
