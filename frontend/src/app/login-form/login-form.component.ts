import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formItems: FormGroup;

  constructor(private elementRef: ElementRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#656565';
  }

  initForm(): void {
    this.formItems = this.fb.group({
      login: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(/[A-z0-9]/),
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64),
      ]]
    });
  }

  onSubmit() {
    console.log(this.formItems.controls);
    if (!this.formItems.invalid) {
      console.log('Nice');
      const data = {
        'login': this.formItems.controls['login'],
        'password': this.formItems.controls['password']
      };
    } else {
      console.log('Invalid data');
    }
  }
}
