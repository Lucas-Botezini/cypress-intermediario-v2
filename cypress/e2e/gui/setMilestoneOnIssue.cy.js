import { faker } from "@faker-js/faker";

const options = { env: { snapshotOnly: true } }

describe('Set a milestone on a issue', options, () => {

    const milestone = {
        title: `milestone-${faker.random.words(2)}`
    }

    const issue = {
        title: `issue-${faker.datatype.uuid}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        
        cy.login()

        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)

            })

    })

    it('sucessfully', () => {

        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.block.milestone').should('contain', milestone.title)

    })

})