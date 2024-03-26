import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("validate JSON 10", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.hardComplexo);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("Validate how much the user has money the wich car can purchase", async () => {
    let userArray = res.users;
    for (let userObj of userArray) {
      request.ExpectAssert(userObj.name);
      request.ExpectAssert(userObj.money);
      let productArray = res.products;
      for (let productObj of productArray) {
        request.ExpectAssert(productObj.car);
        request.ExpectAssert(productObj.color);
        request.ExpectAssert(productObj.value);
        if (productObj.value <= userObj.money) {
          let print = `Eu sou ${userObj.name} tenho ${userObj.money} e posso comprar um ${productObj.car} ${productObj.color} que custa ${productObj.value}`;
          cy.log(print);

        }
      }
    }
  });

  it("Validate the address the store e o ceo", async () => {
    let registrationArray = res.registration
    let baseArray = registrationArray.base
    for (let baseObj of baseArray) {
        let sulAddr =  baseObj.sul
        request.ExpectAssert(sulAddr.street)
        let northAddr = baseObj.north
        request.ExpectAssert(northAddr.street)
        cy.log(`A loja Sul fica localizada ${sulAddr.street}`)
        cy.log(`A loja North fica localizada ${northAddr.street}`)
    }
    let ceoObj = registrationArray.ceo
    request.ExpectAssert(ceoObj)
    cy.log(ceoObj)
  });
});
