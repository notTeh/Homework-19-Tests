describe('Example Test Suite', () => {
    it('should display the correct title', () => {
        cy.visit('http://localhost:3000');
        cy.title().should('include', 'Expected Title');
    });
});