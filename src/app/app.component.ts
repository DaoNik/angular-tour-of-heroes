import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './_helpers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private auth: AuthenticationService) {}

  logout() {
    this.auth.logout();
  }

  form = new FormGroup({
    temp1: new FormControl(false, Validators.required),
    temp2: new FormControl(null, Validators.required),
    temp3: new FormControl(true, Validators.required)
  })

}
