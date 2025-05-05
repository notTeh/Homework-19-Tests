import React from 'react';
import Quiz from '../../src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mount the Quiz component
    cy.mount(<Quiz />);
  });

  it('renders the start button', () => {
    // Verify the start button is visible
    cy.get('button').contains('Start Quiz').should('exist').and('be.visible');
  });

  it('displays the first question when the quiz starts', () => {
    // Click the start button
    cy.get('button').contains('Start Quiz').click();

    // Verify the first question is displayed
    cy.get('h2').should('be.visible');
    cy.get('h2').should('not.contain', 'Quiz Completed');
  });

  it('allows selecting an answer and progresses to the next question', () => {
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Verify the first question is displayed
    cy.get('h2').should('be.visible');

    // Click the first answer button
    cy.get('.btn.btn-primary').first().click();

    // Verify the question changes or progresses
    cy.get('h2').should('be.visible');
  });

  it('displays the quiz completion screen after answering all questions', () => {
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Answer all questions
    cy.get('.btn.btn-primary').each(() => {
      cy.get('.btn.btn-primary').first().click();
    });

    // Verify the quiz completion screen
    cy.contains('Quiz Completed').should('be.visible');
    cy.get('.alert.alert-success').should('contain.text', 'Your score:');
  });

  it('allows restarting the quiz after completion', () => {
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Answer all questions
    cy.get('.btn.btn-primary').each(() => {
      cy.get('.btn.btn-primary').first().click();
    });

    // Verify the quiz completion screen
    cy.contains('Quiz Completed').should('be.visible');

    // Restart the quiz
    cy.get('button').contains('Take New Quiz').click();

    // Verify the first question of the new quiz is displayed
    cy.get('h2').should('be.visible');
    cy.get('h2').should('not.contain', 'Quiz Completed');
  });
});