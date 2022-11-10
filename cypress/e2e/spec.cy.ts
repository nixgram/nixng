describe('App Component Init - Check Nixng title', () => {
  it('Should contain heading', () => {
    cy.visit('http://localhost:4200/')
    cy.contains("This is nixng")
  })
})