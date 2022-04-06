import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_helpers/User';
import { AuthenticationService } from '../_helpers/authentication.service';
import {catchError, of, throwError} from 'rxjs';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss'] })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    submitted!: boolean;
    errMessage: string = '';

    constructor(
        public auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        })
    }

    authorize() {
      if (this.form.invalid) {
        return;
      }

      this.submitted = true;

      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.auth.login(user).pipe(
        catchError((err) => {
          this.auth.logout();
          this.errMessage = err.error.message;
          return throwError(() => err);
        })
      ).subscribe(() => {
        this.router.navigate(['dashboard'])
        this.submitted = false;
      }, () => this.submitted = false)
    }
}
