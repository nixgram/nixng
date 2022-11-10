describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.contains("This is nixng")
  })
})