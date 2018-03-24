import { AngularOverwatchApp } from './app.po';

describe('Overwatch Group Up', () => {
  let page: AngularOverwatchApp;

  beforeEach(() => {
    page = new AngularOverwatchApp();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('OVERWATCH GROUP UP');
  });
});
