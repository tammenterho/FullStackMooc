describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'mikkomikko',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login button is shown', function() {
    cy.contains('button', 'log in').should('be.visible');
  });

  describe('Log in form', function() {
    beforeEach(function() {
      cy.contains('button', 'log in').click();
    })

    it('should have username field', function() {
      cy.wait(500); // Odota 500 ms
      cy.get('[name="Username"]').should('be.visible');
    });

    it('should have password field', function() {
      cy.wait(500); // Odota 500 ms
      cy.get('[name="Password"]').should('be.visible');
    });

    it('should be able to log in successfully', function() {
      // Täytä käyttäjänimi ja salasana
      cy.get('[name="Username"]').type('mikkomikko');
      cy.get('[name="Password"]').type('salasana');

      // Klikkaa "Kirjaudu sisään" -painiketta
      cy.get('button[type="submit"]').click();

      // Voit tarkistaa, että olet kirjautunut sisään esimerkiksi tervetuloviestin tai jonkin muun elementin avulla
      cy.contains('Welcome, Test user!').should('be.visible');
      cy.contains('Test user logged in.').should('be.visible');
    });
  });
});
