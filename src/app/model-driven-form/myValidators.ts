import { ValidatorFn, AbstractControl, Validators, FormGroup } from '@angular/forms';

export class MyValidators {
  static oneRequired(group : FormGroup) {
    const fields = [];
    for (let field in group.controls) {
      fields.push(group.controls[field]);
    }

    if ( !fields.some(control => control.value && control.value !== '') ) {
      return {
        oneRequired: true
      };
    }

    return null;
  }

  static digits(control: AbstractControl): {[key: string]: any} {
    const value = control.value;
    if (!(/^\d+$/.test(value))) {
      return {
        digits: true
      }
    }

    return null;
  }

  static startsWith(letter : string) : ValidatorFn {
    return (control: AbstractControl) : {[key: string]: any} => {
      if (control.value && !control.value.startsWith(letter)) {
        return {
          startsWith: letter
        }
      }

      return null;
    }
  }
}
