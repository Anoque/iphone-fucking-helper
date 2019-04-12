import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/data.service';
import { NetService } from '../../shared/net/net.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  articles: any[];
  filtered: any[];
  search: string;

  constructor(private fb: FormBuilder, private netService: NetService) {
    this.colors = ['#656565', '#ff0000', '#00ff00'];
    this.color = 0;
    this.error = '';
    this.articles = [];
    this.search = '';
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
        Validators.pattern(/[A-z0-9А-я]/),
      ]
      ],
      date: ['', []],
      description: ['', []]
    });

    this.loadRelations();
  }

  loadRelations() {
    this.netService.getRequest('articles/all', true).subscribe((res) => {
      this.articles = res.data;
      this.articles.forEach(value => value.title = `${value.id}. value.title`);
      this.searching();
    });
  }

  onSubmit() {
    if (!this.formItems.invalid) {
      const data = {
        'title': this.formItems.controls['title'].value,
        'date': DataService.getDateString(new Date, true),
        'description': this.formItems.controls['description'].value
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

  searching(): void {
      this.filtered = (this.search.length === 0)
        ? this.articles
        : this.articles.filter(value => value.title.toUpperCase().indexOf(this.search.toUpperCase()) !== -1);
  }

}
