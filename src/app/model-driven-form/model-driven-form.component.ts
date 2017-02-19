import { Component, OnInit }          from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray }          from '@angular/forms';
import {MyValidators} from "./myValidators";

@Component({
  selector: 'model-driven-form',
  templateUrl: './model-driven-form.component.html'
})
export class ModelDrivenFormComponent implements OnInit {
  modelForm : FormGroup;

  constructor(private formBuilder : FormBuilder) {}

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      firstname: ['', [Validators.required, MyValidators.startsWith("m")]],
      lastname: ['',[Validators.required, Validators.minLength(3)]],
      positions: this.formBuilder.array([])
    });
  }

  get positions() : FormArray {
    return <FormArray>this.modelForm.get('positions');
  }

  buildPosition() : FormGroup {
    return this.formBuilder.group({
      job: '',
      company: '',
      city: ''
    }, { validator: MyValidators.oneRequired});
  }

  addPosition() : void {
    this.positions.push(this.buildPosition())
  }

  removePosition(i) : void {
    this.positions.removeAt(i);
  }


  onSubmit(form) {
    console.log(this.modelForm.controls['positions']['controls'][0].get('job'));
    console.log(form);
  }
}

