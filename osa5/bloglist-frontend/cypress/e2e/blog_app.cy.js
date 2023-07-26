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
    // Tarkista, että "Log in" -nappi on näkyvissä ja sisältää tekstin "log in"
    cy.contains('button', 'log in').should('be.visible');
  });

  it('Can log in successfully', function() {
    // Klikkaa "Log in" -painiketta
    cy.contains('button', 'log in').click();

    // Voit tarkistaa esimerkiksi, että olet kirjautunut sisään
    // Tämä voi olla esimerkiksi tietty viesti tai elementti, joka ilmoittaa onnistuneesta kirjautumisesta.
    // Esimerkiksi:
    // cy.contains('Welcome, tester!').should('be.visible');
    // Tämä olettaa, että kirjautumisen jälkeen näkymässä näytetään tervetuloviesti kirjautuneelle käyttäjälle.
  });
});
