
import { Requests } from "../support/Requests";


// let json = require(`../../fixtures/jsons/simple-simple.json`)
let request = new Requests();
let res = null;

describe('Validate JSON 3 ', async () => {
    let env = null;
    env = await Cypress.env()[Cypress.env('environmentRun')];

    it('Loading requisition', async () => {
        request.doRequest(env.simplemedium);
        await cy.get('@response').then((response) => {
            res = response;
            cy.task('log', JSON.stringify(response))
        })
    });

    it('Validate user name', () => {
        for (let json of res) {
            request.ExpectAssert(json.user);
            request.ExpectAssert(json.user.name);
            request.ExpectAssert(json.user.name, "Thompson");
        }
    });

    it('Validate property address', async () => {
        for (let json of res) {
            request.ExpectAssert(json.user.address)
            request.ExpectAssert(json.user.address.city)
            request.ExpectAssert(json.user.address.city, "Matthews")
        }
    });
});