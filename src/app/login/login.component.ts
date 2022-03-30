import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_helpers/User';
import { AuthenticationService } from '../_helpers/authentication.service';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.scss'] })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    submitted!: boolean;

    constructor(
        public auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
          username: new FormControl('', [Validators.minLength(2)])
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
        username: this.form.value.username
      }

      this.auth.login(user).subscribe(() => {
        this.form.reset();
        this.router.navigate(['dashboard'])
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      })
    }
}
