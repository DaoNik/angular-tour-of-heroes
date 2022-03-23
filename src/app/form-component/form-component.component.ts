import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl('', [Validators.pattern('[а-яёА-ЯЁ -]*')]);
  filteredSkills: Observable<string[]>;
  skills: string[] = ['Жизнерадостность', 'Заинтересованность', 'Интеллект'];
  allSkills: string[] = ['Жизнерадостность', 'Заинтересованность', 'Интеллект', 'Гуглеж', 'Коммуникативность', 'Упорство'];

  myForm: FormGroup = new FormGroup({
    firstNameControl: new FormControl('', [Validators.required, Validators.pattern('[а-яёА-ЯЁ -]*')]),
    lastNameControl: new FormControl('', [Validators.required, Validators.pattern('[а-яёА-ЯЁ -]*')]),
    specialNameControl: new FormControl('', [Validators.pattern('[а-яёА-ЯЁ -]*')]),
    emailControl: new FormControl('', [Validators.email]),
    skillControl: new FormControl(this.skills)
  })

  skillField: string = '';
  formValues: object | undefined;

  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );
  }

  submitForm() {
    console.log(this.skills);
    this.myForm.setValue({
      skillControl: [...this.skills],
      ...this.myForm.value
    })
    this.formValues = this.myForm.value;
    console.log(this.myForm)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  clearForm() {
    this.myForm.reset()
    this.skills = ['Жизнерадостность', 'Заинтересованность', 'Интеллект'];
    this.skillInput.nativeElement.value = '';
  }
}
