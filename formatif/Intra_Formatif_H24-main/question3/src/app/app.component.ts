import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive.form';

  form: FormGroup<any>;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      roadnumber: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      postalcode: ['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      comments: ['', [this.commentValidator]]
    },{validators: this.customValidator});
  }

  commentValidator(control: AbstractControl): ValidationErrors | null {
    const comment = control.value;
    console.log(comment)
    console.log(comment.split(' '))
    if (!comment)
      return null;

    let commentIsLong = comment.split(' ').length >= 10;
    return !commentIsLong ? {comment: true} : null;
  }

  private customValidator(form:AbstractControl): ValidationErrors|null {
    const name = form.get("name")?.value;
    const comments = form.get("comments")?.value;

    if (!comments || !name)
      return null

    let formValid = !comments.includes(name)
    return !formValid?{nameInComment:true}:null;
  }
}
