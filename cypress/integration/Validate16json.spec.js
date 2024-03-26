import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("Validate JSON 16", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.ultra);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("print JSON created", async () => {
    let user = res.users;
    for (let userObj of user) {
      expect(userObj.name).to.exist;
      expect(userObj.last_name).to.exist;
      expect(userObj.id).to.exist;
    }
    let product = res.products;
    for (let productObj of product) {
        expect(productObj.car).to.exist;
        expect(productObj.marca).to.exist;
    }
    let vip = res.VIPs
    for (let vipObj of vip) {
        expect(vipObj.car).to.exist;
    }
  });
});
