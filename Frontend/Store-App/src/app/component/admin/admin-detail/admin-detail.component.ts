import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]],
      price: ['', Validators.required],
      description: ['',
        [
          Validators.required,
          Validators.maxLength(200)
        ]],
      imageURL: ['', Validators.required],
    });
  }

}
