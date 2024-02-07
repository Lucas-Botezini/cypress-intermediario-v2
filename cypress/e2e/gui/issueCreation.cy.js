import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Criando Issues no GitLab', options, () => {

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description : faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach('', () => {
        cy.api_deleteProjects()
        cy.login()

        cy.api_createProject(issue.project)
    })

    it('Creates a issue', () => {

        cy.gui_createIssue(issue)

        cy.get('.issue-details').should('contain.text', issue.title).and('contain.text', issue.description)

    })

})