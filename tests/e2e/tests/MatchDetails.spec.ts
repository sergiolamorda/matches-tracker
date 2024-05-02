describe('MatchDetails View', () => {
  it('Show the match details', () => {
    const realMatch = {
      id: 103789,
      localTeamName: 'BAR',
      visitorTeamName: 'JOV',
      localScore: 95,
      visitorScore: 79,
      periods: [
        {
          period: 1,
          events: [
            'Pérdida A. Tomic',
            'Canasta de 3 T. Satoransky'
          ]
        },
        {
          period: 4,
          events: [
            'Personal 1TL D. Thomas',
            'Personal no TL D. Brizuela'
          ]
        }
      ]
    }

    cy.visit(`/matches/${realMatch.id}`);

    cy.findByText(realMatch.localTeamName).should('exist');
    cy.findByText(realMatch.visitorTeamName).should('exist');
    cy.findByText(realMatch.localScore).should('exist');
    cy.findByText(realMatch.visitorScore).should('exist');

    realMatch.periods.forEach((period) => {
      cy.findByRole('tab', { name: `${period.period}P` }).click();
      period.events.forEach((event) => {
        // expect 1 or more
        cy.findAllByText(new RegExp(event), "i").should('exist');
      })
    })
  });
})