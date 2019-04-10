import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../shared/data.service';
import {NetService} from '../../shared/net/net.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ background: '#000000' })),
      transition(':enter', [
        style({ background: '#ffffff' }),
        animate(1600)
      ])
    ])
  ]
})
export class ArticleFormComponent implements OnInit {
  formItems: FormGroup;
  colors: string[];
  color: number;
  error: string;

  constructor(private fb: FormBuilder, private netService: NetService) {
    this.colors = ['#656565', '#ff0000', '#00ff00'];
    this.color = 0;
    this.error = '';
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.formItems = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255),
        Validators.pattern(/[A-z0-9]/),
      ]
      ],
      date: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    if (!this.formItems.invalid) {
      const data = {
        'title': this.formItems.controls['title'].value,
        'date': DataService.getDateString(this.formItems.controls['date'].value, true)
      };

      this.netService.sendRequest('articles/add/', data).subscribe((res) => {
        if (res.status) {
          this.color = 2;
        } else {
          this.color = 1;
        }
      }, err => {
        if (err.error.details) {
          this.error = err.error.details;
        } else {
          this.error = err.message;
        }
      });
    } else {
      this.color = 1;
    }
  }

}
