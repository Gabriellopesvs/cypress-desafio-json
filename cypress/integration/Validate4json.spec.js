
import { Requests } from "../support/Requests";


// let json = require(`../../fixtures/jsons/simple-simple.json`)
let request = new Requests();
let res = null;

describe('Validate JSON 4', async () => {
    let env = null;
    env = await Cypress.env()[Cypress.env('environmentRun')];

    it('Loading requisition', async () => {
        request.doRequest(env.medium);
        await cy.get('@response').then((response) => {
            res = response;
            cy.task('log', JSON.stringify(response))
        })
    });

    it('Validate array users ', async () => {
        for (let json of res.users) {
            request.ExpectAssert(json)
            request.ExpectAssert(json.name)
            request.ExpectAssert(json.name, "Margareth", "Michael")
        }
    });

    it('Validate array address', async () => {

        request.ExpectAssert(res.address.city)
        request.ExpectAssert(res.address.UF)
        request.ExpectAssert(res.address.geo)
        request.ExpectAssert(res.address.street)
    });

    it('Validate address geo', async () => {
        for (let json of res.address.geo) {
            request.ExpectAssert(json.state)
            request.ExpectAssert(json.state.long, 15132534)


            for (let planet of json.state.planet) {
                request.ExpectAssert(planet, "Earth")
            }

        }

    });
});