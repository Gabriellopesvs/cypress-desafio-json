import { Requests } from "../support/Requests";


// let json = require(`../../fixtures/jsons/simple-simple.json`)
let request = new Requests();
let res = null;
describe('Validate JSON simple-simple', async () => {
    let env = null;
    env = await Cypress.env(Cypress.env())[Cypress.env('environmentRun')];

    it('Loading requisition', async () => {
        request.doRequest(env.simplejson);
        await cy.get('@response').then((response) => {
            res = response;
            cy.task('log', JSON.stringify(response))

            request.ExpectAssert(response.user)
            request.ExpectAssert(response.user.name, "Thompson")

        })
    });

    it('Validate others property', async () => {

        request.ExpectAssert(res.user.address);
        request.ExpectAssert(res.user.address.city, "Matthews");

    });

});

