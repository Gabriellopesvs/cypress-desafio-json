import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("Validate JSON 12", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.masterSimples);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("Validate how much money the user has and which car he can buy and if he is a VIP inform which car he is also entitled to", async () => {
    let userArray = res.users;
    for (let userObj of userArray) {
      let productArray = res.products;
      for (let productObj of productArray) {
        let vipArray = res.VIPs;
        let print = `Eu sou ${userObj.name} tenho ${userObj.money} e posso comprar um ${productObj.car} ${productObj.color} que custa ${productObj.value}`;
        if (productObj.value <= userObj.money && userObj.class === "NOT-VIP") {
          request.ExpectAssert(userObj.money);
          request.ExpectAssert(userObj.class);
          request.ExpectAssert(productObj.car);
          request.ExpectAssert(productObj.value);
          cy.log(print);
        }
        if (productObj.value <= userObj.money && userObj.class === "VIP") {
          cy.log(
            print +
              `, Você é ${userObj.class} e tem direito os carros ${vipArray[0].car}, ${vipArray[1].car} e ${vipArray[2].car}`
          );
        }
      }
    }
  });
  it("Validate the address the store e o ceo", async () => {
    let registrationObj = res.registration;
    let baseArray = registrationObj.base;
    for (let baseObj of baseArray) {
      let sulAddr = baseObj.sul;
      request.ExpectAssert(sulAddr.street);
      let northAddr = baseObj.north;
      request.ExpectAssert(northAddr.street);
      cy.log(`A loja Sul fica localizada ${sulAddr.street}`);
      cy.log(`A loja North fica localizada ${northAddr.street}`);
    }
    let ceoObj = registrationObj.ceo;
    request.ExpectAssert(ceoObj);
    cy.log(ceoObj);
  });
});
