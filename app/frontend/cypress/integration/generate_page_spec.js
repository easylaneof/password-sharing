describe('Generate page spec', () => {
  beforeEach(() => {
    cy.visit('/generate');
  });

  it('copies url to clipboard', () => {
    cy.contains('Copy to clipboard').click();

    cy.window().then((w) => w.navigator.clipboard.readText().then((text) => expect(text.length).to.be.greaterThan(5)));
  });
});