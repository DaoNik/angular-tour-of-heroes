import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_helpers/User';
import { AuthenticationService } from '../_helpers/authentication.service';

@Component({ templateUrl: 'register.component.html', styleUrls: ['register.component.scss'] })
export class RegisterComponent implements OnInit {
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

      this.auth.register(user).subscribe(() => {
        this.form.reset();
        this.router.navigate(['login'])
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      })
    }
}