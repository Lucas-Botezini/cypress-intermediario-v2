import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Creating projects in GitLab with Cypress', options, () => {
    
    beforeEach('login', () => {
      // cy.session('login', () => {
      //   cy.login()
      // })
      cy.api_deleteProjects()
      cy.login()
    })



    // it('create', () => {
    //     cy.create()

    // })
    it('successfully', () => {
        const project = {
          name: `project-${faker.datatype.uuid()}`,
          description: faker.random.words(5)
        }
    
        cy.gui_createProject(project)
    
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
      })


// href="/projects/new"
})
