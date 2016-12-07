import { Ng2contactsPage } from './app.po';

describe('ng2contacts App', function() {
  let page: Ng2contactsPage;

  beforeEach(() => {
    page = new Ng2contactsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
