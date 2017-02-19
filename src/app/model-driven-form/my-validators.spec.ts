import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from "./myValidators";

describe('digits', () => {
  it('should error on an empty string', () => {
    expect(MyValidators.digits(new FormControl(''))).toEqual({'digits': true});
  });

  it('should error on non empty string', () => {
    expect(MyValidators.digits(new FormControl('not empty'))).toEqual({'digits': true});
  });

  it('should error on null', () => {
    expect(MyValidators.digits(new FormControl(null))).toEqual({'digits': true});
  });

  it('should accept zero as valid', () => {
    expect(MyValidators.digits(new FormControl(23))).toBeNull();
  });
});


describe('startsWith', () => {
  it('should error on incorrect string', () => {
    expect(MyValidators.startsWith("m")(new FormControl('John Doe'))).toEqual({'startsWith': "m"});
  });

  it('should be case sensitive', () => {
    expect(MyValidators.startsWith("m")(new FormControl("Monica"))).toEqual({'startsWith': "m"});
    expect(MyValidators.startsWith("L")(new FormControl("lmao"))).toEqual({'startsWith': "L"});
    expect(MyValidators.startsWith("VIN")(new FormControl("ViNzxc"))).toEqual({'startsWith': "VIN"});
    expect(MyValidators.startsWith("viN")(new FormControl("ViNzxc"))).toEqual({'startsWith': "viN"});
  });

  it('should not error on valid strings', () => {
    expect(MyValidators.startsWith("m")(new FormControl('miracle'))).toBeNull();
    expect(MyValidators.startsWith("M")(new FormControl('Monica'))).toBeNull();
    expect(MyValidators.startsWith("VIN")(new FormControl('VINzao'))).toBeNull();
    expect(MyValidators.startsWith("xxx")(new FormControl('xxxoOo'))).toBeNull();
  });
});

describe('oneRequired', () => {
  let group:FormGroup;
  beforeEach(() => {
    group = new FormGroup({
      job: new FormControl(''),
      city: new FormControl(''),
      company: new FormControl('')
    });
  });

  it('should error when all are not filled', () => {
    expect(MyValidators.oneRequired(group)).toEqual({'oneRequired': true});
  });

  it('should not error when at least one is filled', () => {
    group.get('job').patchValue('Tester');
    expect(MyValidators.oneRequired(group)).toBeNull();
  });
});
