import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form: FormGroup<any>;
  formData?: Data;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      favAnimal: ['', [Validators.required, this.favAnimalValidator]],
      favEstChat: ['', [Validators.required, this.favEstChatValidator]]
    });

    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    })
  }

  favAnimalValidator(control: AbstractControl): ValidationErrors | null {
    const favAnimal = control.value;

    if (!favAnimal) {
      return null;
    }

    let estChat = favAnimal === "chat";

    return !estChat ? {favAnimal: true} : null;
  }

  favEstChatValidator(control: AbstractControl): ValidationErrors | null {
    const favEstChat = control.value;

    if (!favEstChat)
      return null

    let estOui = favEstChat === "oui";

    return !estOui ? {favEstChat: true} : null;
  }
}
interface Data {
  favAnimal?: string | null;
  favEstChat?: string | null;
}
