describe('App Component - Translation Check', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/')
    })

    it('Should contain english title', () => {
        cy.get('[data-cy="language"]').select('en')
        cy.contains("This is nixng")
    })
    it('Should contain spanish title', () => {
        cy.get('[data-cy="language"]').select('es')
        cy.contains("Esto es nixng")
    })
    it('Should contain Bangla title', () => {
        cy.get('[data-cy="language"]').select('bn')
        cy.contains("এটা হলো nixng")
    })
})