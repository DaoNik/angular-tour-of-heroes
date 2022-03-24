import {COMMA, ENTER, N} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  example: string[] = ['Жизнерадостность', 'Заинтересованность', 'Интеллект'];
  skills: FormControl[] = [new FormControl('Жизнерадостность'), new FormControl('Заинтересованность'), new FormControl('Интеллект')];
  allSkills: string[] = ['Жизнерадостность', 'Заинтересованность', 'Интеллект', 'Гуглеж', 'Коммуникативность', 'Упорство'];

  myForm: FormGroup = new FormGroup({
    firstNameControl: new FormControl('', [Validators.required, Validators.pattern('[а-яёА-ЯЁ -]*')]),
    lastNameControl: new FormControl('', [Validators.required, Validators.pattern('[а-яёА-ЯЁ -]*')]),
    specialNameControl: new FormControl('', [Validators.pattern('[а-яёА-ЯЁ -]*')]),
    emailControl: new FormControl('', [Validators.email]),
    skillControl: new FormArray(this.skills)
  })

  get newSkills() {
    return this.myForm.get('skillControl') as FormArray;
  }

  skillField: string = '';
  formValues: object | undefined;

  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );
  }

  submitForm() {
    this.formValues = this.myForm.value;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      this.newSkills.push(this.fb.control(value))
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(index: number): void {
    this.newSkills.removeAt(index);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.viewValue);
    this.newSkills.push(this.fb.control(event.option.viewValue))
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  clearForm() {
    this.myForm.reset()
    this.newSkills.controls.splice(3);

    while (this.newSkills.controls.length < 3) {
      this.newSkills.push(this.fb.control(''));
    }
    this.newSkills.patchValue(this.example);

    this.skillInput.nativeElement.value = '';
  }
}
