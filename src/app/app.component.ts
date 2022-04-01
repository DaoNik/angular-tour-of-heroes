import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './_helpers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    if (localStorage.getItem('refreshToken')) {
      this.updateAfterOut();
      this.updateToken()
    }
  }

  updateToken() {
    setInterval(() => {
      this.auth.refreshToken(localStorage.getItem('refreshToken')!)
      .subscribe()
    }, 60 * 1000)
  }

  updateAfterOut() {
    if (localStorage.getItem('refreshToken')) {
      this.auth.refreshToken(localStorage.getItem('refreshToken')!)
        .subscribe()
    } else {
      this.router.navigate(['login'])
    }
  }

  logout() {
    this.auth.logout();
  }

  form = new FormGroup({
    temp1: new FormControl(false, Validators.required),
    temp2: new FormControl(null, Validators.required),
    temp3: new FormControl(true, Validators.required)
  })

}
