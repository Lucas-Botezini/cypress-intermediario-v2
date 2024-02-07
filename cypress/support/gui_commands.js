//const { delay } = require("cypress/types/bluebird")

Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})
  
Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click()
    cy.contains('Sign out').click()

})

// Cypress.Commands.add('create', () => {
//     cy.get('.blank-state-link[href="/projects/new"]').click()

//     cy.get('#project_name[data-track-label="blank_project"]').type('First Project')
    
//     cy.get('#project_initialize_with_readme[data-track-label="blank_project"]').check()
//     // cy.get('.btn-success.project-submit').click()
    
//     cy.get('#blank-project-pane > #new_project > .btn-success').click()
// })

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name, {delay: 0})
  cy.get('#project_description').type(project.description, {delay: 0})
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})


Cypress.Commands.add('gui_createIssue', issue => {

  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  // cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title#issue_title').type(issue.title, {delay: 0})

  cy.get('.qa-issuable-form-description#issue_description').type(issue.description, {delay: 0})

  cy.get('.assign-to-me-link.qa-assign-to-me-link').click()

  cy.get('.qa-issuable-create-button[value="Submit issue"]').click()

})

Cypress.Commands.add('gui_setLabelOnIssue', label => {

  cy.get('.qa-edit-link-labels').click()

  cy.contains(label.name).click()

  cy.get('body').click()


})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {

  cy.get('.block.milestone .edit-link').click()
  
  cy.contains(milestone.title).click()

})