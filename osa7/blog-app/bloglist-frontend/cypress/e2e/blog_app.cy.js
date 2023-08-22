describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Test user',
      username: 'mikkomikko',
      password: 'salasana',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login button is shown', function () {
    cy.contains('button', 'log in').should('be.visible');
  });

  describe('Log in form', function () {
    beforeEach(function () {
      cy.contains('button', 'log in').click();
      cy.get('[name="Username"]').type('mikkomikko');
      cy.get('[name="Password"]').type('salasana');
      cy.get('button[type="submit"]').click();
    });

    it('should have username field', function () {
      cy.get('[name="Username"]').should('be.visible');
    });

    it('should have password field', function () {
      cy.get('[name="Password"]').should('be.visible');
    });

    it('should be able to log in successfully', function () {
      cy.contains('Blogs').should('be.visible');
      cy.contains('Create New').should('be.visible');
    });

    it('A blog can be created', function () {
      cy.get('[name="Title"]').type('Opi koodia kanssani');
      cy.get('[name="Author"]').type('Josefiina Pythonnaama');
      cy.get('[name="url"]').type('http://www.opijossunkaa.com');

      // Kirjaa sisään käyttäjä ja hanki JWT-tunniste
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'mikkomikko',
        password: 'salasana',
      }).then((response) => {
        const token = response.body.token;

        // Lisää JWT-tunniste pyynnön otsikkoihin
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            title: 'Opi koodia kanssani',
            author: 'Josefiina Pythonnaama',
            url: 'http://www.opijossunkaa.com',
          },
        });
      });

      // Klikkaa "create" (tallenna) -nappia
      cy.contains('create').click();

      // Tarkista, että luotu blogi näkyy sivulla
      cy.contains('Opi koodia kanssani').should('be.visible');
    });
  });
});
