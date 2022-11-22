describe('Convert Specification', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Null Currencies Check', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.get('[name="submit-button"]').click();
    cy.wait(5000);
    cy.get('[name="result-textbox"]').should('have.value', "Error: Cannot have null currencies");
  })

  it('0 Value Check', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.get('[name="base"]').parent().click()
    cy.get(`[data-cy = "select-option-USD"]`).click();
    cy.get('[name="target"]').parent().click()
    cy.get(`[data-cy = "select-option-EUR"]`).click();
    cy.get('[name="value"]').click().type("0");
    cy.wait(5000);
    cy.get('[name="submit-button"]').click();
    cy.get('[name="result-textbox"]').should('have.value', "Error: Cannot have a zero value");
  })

  it('Negative Value Check', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.get('[name="base"]').parent().click()
    cy.get(`[data-cy = "select-option-USD"]`).click();
    cy.get('[name="target"]').parent().click()
    cy.get(`[data-cy = "select-option-EUR"]`).click();
    cy.get('[name="value"]').click().type("-5");
    cy.wait(5000);
    cy.get('[name="submit-button"]').click();
    cy.get('[name="result-textbox"]').should('have.value', "Error: Cannot have a negative value");
  })

  it('Correct Value Check', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
    cy.get('[name="base"]').parent().click()
    cy.get(`[data-cy = "select-option-USD"]`).click();
    cy.get('[name="target"]').parent().click()
    cy.get(`[data-cy = "select-option-EUR"]`).click();
    cy.get('[name="value"]').click().type("56");
    cy.get('[name="submit-button"]').click();
    cy.wait(5000);
    cy.get('[name="result-textbox"]').should('be.visible');
  })

})