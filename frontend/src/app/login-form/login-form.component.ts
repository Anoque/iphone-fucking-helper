import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetService } from '../shared/net/net.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formItems: FormGroup;
  showErrors: boolean;
  showInvalidMessage: boolean;

  constructor(private elementRef: ElementRef, private fb: FormBuilder, private netService: NetService,
              private router: Router) {
    this.showInvalidMessage = false;
    this.showErrors = false;
  }

  ngOnInit() {
    this.initForm();
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#656565';
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
      this.showErrors = true;
      const data = {
        'username': this.formItems.controls['login'].value,
        'password': this.formItems.controls['password'].value
      };

      this.netService.sendRequest('api-token-auth/', data).subscribe(
        res => {
            if (res['token']) {
              console.log(res.token);
              this.netService.setToken(res.token);
              this.showInvalidMessage = false;
              setTimeout(() => this.router.navigate(['/articles']), 1000);
            }
          },
        err => {
          console.log(err.error.non_field_errors);
          this.showInvalidMessage = true;
        }
      );
    } else {
      console.log('Invalid data');
    }
  }
}
