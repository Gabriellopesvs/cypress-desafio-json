import { Requests } from "../support/Requests";

// let json = require(`../../fixtures/jsons/complex.json`)
let request = new Requests();
let res = null;

describe("Validate JSON 6", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.complex);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("validate user camp and joining name and age", async () => {
    let user = res.users;

    for (let users of user) {
    let names = users.name
    let years = users.year
    request.ExpectAssert(names)
    request.ExpectAssert(years)
    cy.log(`Eu sou ${names} e tenho ${years}`)
    }
  });

  it("Validate camp products and which car is available", async () => {
    let product = res.products;
    for (let products of product) {
      request.ExpectAssert(products.car);
      cy.log(`Carro ${products.car} Disponivel para compra`);
    }
  });

  it("Validate adrress of camp ceo", async () => {
    let registration = res.registration;
    request.ExpectAssert(registration.ceo);
  });
});
