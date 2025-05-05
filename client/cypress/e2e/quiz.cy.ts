describe('Tech Quiz Application', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('starts the quiz when the start button is clicked', () => {
      // Verify the start button is visible and click it
      cy.get('button').contains('Start Quiz').click();
  
      // Verify the first question is displayed
      cy.get('h2').should('be.visible');
      cy.get('h2').should('not.contain', 'Quiz Completed');
    });
  
    it('progresses through all questions and shows the final score', () => {
      // Start the quiz
      cy.get('button').contains('Start Quiz').click();
  
      // Answer all questions
      cy.get('h2').should('be.visible');
      cy.get('.btn.btn-primary').each(() => {
        // Click the first answer button for each question
        cy.get('.btn.btn-primary').first().click();
      });
  
      // Verify the quiz completion screen
      cy.contains('Quiz Completed').should('be.visible');
      cy.get('.alert.alert-success').should('contain.text', 'Your score:');
    });
  
    it('allows starting a new quiz after completion', () => {
      // Start the quiz
      cy.get('button').contains('Start Quiz').click();
  
      // Answer all questions
      cy.get('.btn.btn-primary').each(() => {
        cy.get('.btn.btn-primary').first().click();
      });
  
      // Verify the quiz completion screen
      cy.contains('Quiz Completed').should('be.visible');
  
      // Start a new quiz
      cy.get('button').contains('Take New Quiz').click();
  
      // Verify the first question of the new quiz is displayed
      cy.get('h2').should('be.visible');
      cy.get('h2').should('not.contain', 'Quiz Completed');
    });
  });