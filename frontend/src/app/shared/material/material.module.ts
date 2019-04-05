import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDividerModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
  ]
})
export class MaterialModule { }
