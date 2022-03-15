import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  userFormControl = new FormControl('', [Validators.required]);

  passFormControl = new FormControl('', [Validators.required, Validators.minLength(8)])

  ngOnInit(): void {

  }
}
