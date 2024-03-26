
import { Requests } from "../support/Requests";


// let json = require(`../../fixtures/jsons/simple-simple.json`)
let request = new Requests();
let res = null;

describe('Validate JSON 2 ', async () => {
    let env = null;
    env = await Cypress.env(Cypress.env())[Cypress.env('environmentRun')];

    it('Loading requisition', async () => {
        request.doRequest(env.simple);
        await cy.get('@response').then((response) => {
            res = response;
            cy.task('log', JSON.stringify(response))
        })

    });
    it('Validate property user name ', async () => {
        request.ExpectAssert(res.user)
        request.ExpectAssert(res.user.name, "Thompson")
    });

    it('Validate property address city', async () => {
        request.ExpectAssert(res.user.address)
        request.ExpectAssert(res.user.address.city, "Matthews")
    });

    it('Validate property Orders ', async () => {
        request.ExpectAssert(res.user.Order)
        cy.task('log', res.user.Order.sort())
        request.ExpectAssert(res.user.Order.toString(), '1,2,3,4')

    });
});