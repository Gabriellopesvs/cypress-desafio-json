import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("validate JSON 8", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.hardsimples);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("Validate the camp users according to car color", async () => {
    let user = res.users;
    for (let userObj of user) {
      request.ExpectAssert(userObj.name);
      request.ExpectAssert(userObj.year);
      request.ExpectAssert(userObj.color);
      let product = res.products;
      for (let productObj of product) {
        request.ExpectAssert(productObj.car);
        request.ExpectAssert(productObj.color);
        if (userObj.color === productObj.color) {
          let print = `Sou ${userObj.name} tenho ${userObj.year} anos, e tenho um ${productObj.car}`;
          cy.log(print);
        }
      }
    }
  });

  it("validate the address from the store the o ceo", async () => {
    let regist = res.registration;
    let base = res.registration.base;
    for (let baseObj of base) {
      let addrNorth = baseObj.north.street
      request.ExpectAssert(addrNorth)
      let addrSul = baseObj.sul.street
      request.ExpectAssert(addrSul)
      cy.log(`O endereço da loja Norte é ${addrNorth}`)
      cy.log(`O endereço da loja Sul é ${addrSul}`)
    }
    request.ExpectAssert(regist.ceo)
    cy.log(`Cadastro do Ceo é ${regist.ceo}`)
  });
});
