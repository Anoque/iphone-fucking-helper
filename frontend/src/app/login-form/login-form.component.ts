import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetService } from '../shared/net/net.service';
import { Router } from '@angular/router';

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
    if (this.netService.getToken().length > 0) {
      this.router.navigate(['/articles']);
    }
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
    if (!this.formItems.invalid) {
      this.showErrors = true;
      const data = {
        'username': this.formItems.controls['login'].value,
        'password': this.formItems.controls['password'].value
      };

      this.netService.sendRequest('api-token-auth/', data).subscribe(
        res => {
            if (res['token']) {
              this.netService.setToken(res.token);
              this.showInvalidMessage = false;
              this.formItems.reset();
              this.router.navigate(['/articles']);
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
