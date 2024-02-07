// describe('empty spec', () => {
//   beforeEach('visit to site', function() {
//     cy.visit('http://localhost/')
//   })

//   it('login in gitlab', function(){

//     cy.get('#user_login').type('root')
//     cy.get('#user_password').type('I@0309ds')
//     cy.get('#new_user > .submit-container > .btn').click()
//     cy.get('.flash-alert > span').should('not.be.visible')
//   })
// })

// describe('Login', () => {
//   it('successfully', () => {
//     cy.login()

//     cy.get('.qa-user-avatar').should('be.visible')

//     // cy.get('li > .header-user-dropdown-toggle').click()

//     // cy.get('[data-qa-selector="sign_out_link"]').click()

//     // cy.get('[data-qa-selector="sign_in_tab"]').should('be.visible')
//   })
// })


describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})

