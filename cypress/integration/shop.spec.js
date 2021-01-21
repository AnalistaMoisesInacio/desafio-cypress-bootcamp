/// <reference types="cypress" />

// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

context('My Store', () => {
   beforeEach(() => {
       cy.visit('/')
   })

    it('Cadastrar', () => {
        // Direciona para a pagina de cadastro
        cy.get('[class=login]').click()
        cy.get('[id=email_create]').type(chance.email({domain: "desafiocypress.com"}))
        cy.get('[id=SubmitCreate]').click()

        // Insere dados do cadastro
        cy.get('[id=id_gender1]').check().should('be.checked') 
        cy.get('[id=customer_firstname]').type(chance.first())
        cy.get('[id=customer_lastname]').type(chance.last())
        cy.get('[id=passwd]').type('desafio123@')
        cy.get('[id=days]').select(chance.character({ numeric: true, min:2, max:30 }))
        cy.get('[id=months]').select(chance.month())
        cy.get('[id=years]').select(chance.year({min: 1900, max: 2021}))
        cy.get('[id=newsletter]').check()
        cy.get('[id=optin]').check()
        cy.get('[id=company]').type(chance.company())
        cy.get('[id=address1]').type(chance.url())
        cy.get('[id=city]').type(chance.city())
        cy.get('[id=id_country]').select('United States') 
        cy.get('[id=id_state]').select(chance.state({country: 'us', full: true }))
        cy.get('[id=postcode]').type(chance.zip())
        cy.get('[id=phone_mobile]').type(chance.phone({ formatted: false }))       
        
        // Finaliza o cadastro
        cy.get('[id=submitAccount]').click()

        // Valida apresentacao de Page Heading da conta criada
        cy.url().should('eq', Cypress.config().baseUrl + '/index.php?controller=my-account')
        cy.get('.page-heading').should('be.visible').should('have.text', 'My account') 
        cy.get('.info-account').should('be.visible').should('contain.text', 'Welcome to your account.') 

           
    });
});