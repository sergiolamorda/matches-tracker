describe('MatchesWidgetsList View', () => {
  it('Create a new match widget', () => {
    const realMatch = {
      id: 103780,
      localTeamName: 'Zunder Palencia',
      visitorTeamName: 'UCAM Murcia',
    }

    cy.visit('/');

    cy.findByRole('button', { 
      name: /Añadir partido/i 
    }).click();

    cy.findByLabelText(/Introduce el ID/i).type(realMatch.id.toString());

    cy.findByRole('button', {
      name: /Añadir partido/i
    }).click();

    cy.findByText(realMatch.localTeamName).should('exist');
    cy.findByText(realMatch.visitorTeamName).should('exist');
  })

  it('Can not create a repeated match widget', () => {
    const realMatch = {
      id: 103780,
      localTeamName: 'Zunder Palencia',
      visitorTeamName: 'UCAM Murcia',
    }

    cy.visit('/');

    cy.findByRole('button', { 
      name: /Añadir partido/i 
    }).click();

    cy.findByLabelText(/Introduce el ID/i).type(realMatch.id.toString());

    cy.findByRole('button', {
      name: /Añadir partido/i
    }).click();

    cy.findByText(realMatch.localTeamName).should('exist');
    cy.findByText(realMatch.visitorTeamName).should('exist');

    cy.findByRole('button', { 
      name: /Añadir partido/i 
    }).click();

    cy.findByLabelText(/Introduce el ID/i).type(realMatch.id.toString());

    cy.findByRole('button', {
      name: /Añadir partido/i
    }).click();

    cy.findByText(/ya está añadido/i).should('exist');
  });
})