import { Component, Input, OnInit } from '@angular/core';
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
  @Input() id: number;
  formItems: FormGroup;
  colors: string[];
  color: number;
  error: string;
  articles: any[];
  filtered: any[];
  search: string;

  constructor(private fb: FormBuilder, private netService: NetService) {
    this.colors = ['#656565', '#FF7373', '#00ff00'];
    this.color = 0;
    this.error = '';
    this.articles = [];
    this.search = '';
  }

  ngOnInit() {
    this.initForm();
    if (typeof this.id !== 'undefined') {
      this.netService.getRequest(`articles/get/${ this.id }`, true).subscribe((res) => {
        const data = res.data;
      });
    }
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
      description: ['', []],
      parent: ['']
    });

    this.loadRelations();
  }

  loadRelations() {
    this.netService.getRequest('articles/all', true).subscribe((res) => {
      this.articles = res.data;
      this.articles.forEach(value => {
        value.title = `${value.id}. ${value.title}`;
        value.isParent = false;
        value.isChild = false;
      });
      this.searching();
    });
  }

  onSubmit() {
    if (!this.formItems.invalid) {
      const data = {
        'title': this.formItems.controls['title'].value,
        'date': DataService.getDateString(new Date, true),
        'description': this.formItems.controls['description'].value,
        'parents': this.articles.filter(value => value.isParent).map(value => value.id),
        'children': this.articles.filter(value => value.isChild).map(value => value.id)
      };

      this.netService.sendRequest('articles/add/', data).subscribe((res) => {
        if (typeof res.id === 'number') {
          data['id'] = res.id;
          data['title'] = `${res.id}. ${data['title']}`;
          this.articles.unshift(data);
          this.articles.forEach(value => {
            value.isParent = false;
            value.isChild = false;
          });
          this.formItems.reset();
          this.error = '';
          this.color = 0;
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
        ? this.articles.reverse()
        : this.articles
          .filter(value => value.title.toUpperCase().indexOf(this.search.toUpperCase()) !== -1)
          .reverse();
  }

  selectRelation(i: number): void {
    if (!this.articles[i].isParent && !this.articles[i].isChild) {
      this.articles[i].isParent = true;
      this.articles[i].isChild = false;
    } else if (this.articles[i].isParent) {
      this.articles[i].isParent = false;
      this.articles[i].isChild = true;
    } else if (this.articles[i].isChild) {
      this.articles[i].isParent = false;
      this.articles[i].isChild = false;
    }
  }

  showParent(): boolean {
    return this.formItems.controls['parent'].value;
  }

  getRelationListClass(i: number): string {
    if (!this.articles[i].isParent && !this.articles[i].isChild) {
      return '';
    } else if (this.articles[i].isParent) {
      return 'parent-item';
    } else if (this.articles[i].isChild) {
      return 'child-item';
    }
  }
}
