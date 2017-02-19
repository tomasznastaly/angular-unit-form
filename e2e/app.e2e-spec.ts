import { AngularUnitFormPage } from './app.po';

describe('angular-unit-form App', function() {
  let page: AngularUnitFormPage;

  beforeEach(() => {
    page = new AngularUnitFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
