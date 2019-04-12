import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetService } from './net/net.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, MAT_DATE_LOCALE, MAT_LABEL_GLOBAL_OPTIONS, ShowOnDirtyErrorStateMatcher } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  declarations: [
    ErrorMessageComponent
  ],
  exports: [
    ErrorMessageComponent,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    NetService,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class SharedModule { }
