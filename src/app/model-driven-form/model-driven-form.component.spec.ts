/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule, FormBuilder} from "@angular/forms";

import { ModelDrivenFormComponent } from './model-driven-form.component';

describe('ModelDrivenFormComponent', () => {
  let component: ModelDrivenFormComponent;
  let fixture: ComponentFixture<ModelDrivenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [FormBuilder],
      declarations: [ ModelDrivenFormComponent ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ModelDrivenFormComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
    });
  }));

  it('form should be invalid on init', () => {
    expect(component.modelForm.valid).toBeFalsy();
  });

  describe('firstname field validity', () => {
    let firstname, errors;

    beforeEach(() => {
      firstname = component.modelForm.controls['firstname'];
      errors = {};
    });

    it('firstname should be invalid and get required error', () => {
      errors = firstname.errors || {};

      expect(firstname.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    });

    it('firstname should be invalid and get startsWith error', () => {
      firstname.setValue("JohnDoe");
      errors = firstname.errors || {};

      expect(firstname.valid).toBeFalsy();
      expect(errors['required']).toBeFalsy();
      expect(errors['startsWith']).toBe("m");
    });

    it('firstname should be valid', () => {
      firstname.setValue("monica");
      errors = firstname.errors || {};

      expect(firstname.valid).toBeTruthy();
      expect(errors['required']).toBeFalsy();
      expect(errors['startsWith']).toBeUndefined();
    });
  });


  describe('lastname field validity', () => {
    let lastname, errors;

    beforeEach(() => {
      lastname = component.modelForm.controls['lastname'];
      errors = {};
    });

    it('lastname should be invalid and get required and minLength errors', () => {
      errors = lastname.errors || {};

      expect(lastname.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
      expect(errors['minlength']).toBeUndefined();
    });

    it('lastname should be invalid and get minLength error', () => {
      lastname.setValue("Do");
      errors = lastname.errors || {};

      expect(lastname.valid).toBeFalsy();
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    });

    it('lastname should be valid', () => {
      lastname.setValue("John Doe");
      errors = lastname.errors || {};

      expect(lastname.valid).toBeTruthy();
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
    });

  });

  describe('position fields validity', () => {
    let positions, job, errors;

    beforeEach(() => {
      component.addPosition();
      positions = component.modelForm.controls['positions']['controls'][0];
      job = positions.get("job");
      errors = {};
    });

    it('position group should be invalid when all fields are empty', () => {
      errors = positions.errors || {};

      expect(positions.valid).toBeFalsy();
      expect(errors['oneRequired']).toBeTruthy();
    });

    it('position group should be valid when at least one field is filled', () => {
      job.setValue("Angular developer");
      errors = positions.errors || {};

      expect(positions.valid).toBeTruthy();
      expect(errors['oneRequired']).toBeFalsy();
    });
  });

  describe('Add and remove positions', () => {
    let positions;

    beforeEach(() => {
      component.addPosition();
      component.addPosition();
      positions = component.modelForm.controls['positions'];
    });

    it('should add position', () => {
      component.addPosition();
      expect(positions.length).toBe(3);
    });

    it('should remove position', () => {
      component.removePosition(1);
      expect(positions.length).toBe(1);
    });
  });
});
