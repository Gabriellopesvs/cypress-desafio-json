import { Requests } from "../support/Requests";

let request = new Requests();
let res = null;

describe("Validate JSON 15", async () => {
  let env = null;
  env = await Cypress.env()[Cypress.env("environmentRun")];

  it("Loading requisition", async () => {
    request.doRequest(env.masterMaster);
    await cy.get("@response").then((response) => {
      res = response;
      cy.task("log", JSON.stringify(response));
    });
  });

  it("VAlidate the amount of money the user has to buy the car and if it is a VIP which car he is entitled to", async () => {
    for (let arrayJson of res) {
      let userArray = arrayJson.users;
      for (let userObj of userArray) {
        let productArray = arrayJson.products;
        for (let productObj of productArray) {
          let nameVip = userObj.name;
          let part = nameVip.split(" ");
          let print = `Eu sou ${userObj.name} tenho ${userObj.money} e posso comprar um ${productObj.car} ${productObj.color} que custa ${productObj.value}`;
          if (productObj.value <= userObj.money && part[1] === "not-VIP") {
            cy.log(print);
            request.ExpectAssert(userObj.name);
            request.ExpectAssert(userObj.money);
            request.ExpectAssert(productObj.car);
            request.ExpectAssert(productObj.value);
            request.ExpectAssert(productObj.color);
          }
          if (productObj.value <= userObj.money && part[1] === "VIP") {
            request.ExpectAssert(arrayJson.VIPs[0].selection_vip[0].car);
            request.ExpectAssert(arrayJson.VIPs[0].selection_vip[1].car);
            request.ExpectAssert(arrayJson.VIPs[0].selection_vip[2].car);
            cy.log(
              print +
                `, Você é ${part[1]} e tem direito os carros ${arrayJson.VIPs[0].selection_vip[0].car}, ${arrayJson.VIPs[0].selection_vip[1].car} e ${arrayJson.VIPs[0].selection_vip[2].car}`
            );
          }
        }
      }
    }
  });

  it("Validate address from the store the ceo", async () => {
    for (let arrayJson of res) {
      let registrationArray = arrayJson.registration;
      let baseArray = registrationArray.base;
      for (let baseObj of baseArray) {
        let northObj = baseObj.north.street;
        let sulObj = baseObj.sul.street;
        request.ExpectAssert(northObj);
        request.ExpectAssert(sulObj);
        cy.log(`A loja Sul fica localizada ${sulObj}`);
        cy.log(`A loja North fica localizada ${northObj}`);
      }
      let ceoArray = registrationArray.ceo;
      for (let ceoObj of ceoArray) {
        let presidentObj = ceoObj.president;
        request.ExpectAssert(presidentObj);
        cy.log(presidentObj);
      }
    }
  });

  it("Validate camp pré-sal", async () => {
    for (let arrayJson of res) {
      let dataArray = arrayJson.data;
      for (let dataObj of dataArray) {
        let fontArray = dataObj.font;
        for (let fontObj of fontArray) {
          let fundoArray = fontObj.fundo;
          for (let fundoObj of fundoArray) {
            let maisFundoArray = fundoObj.mais_fundo;
            for (let maisFundoObj of maisFundoArray) {
              let preSalObj = maisFundoObj.pre_sal;
              let chegandoObj = preSalObj.chegando;
              let achouObj = chegandoObj.achou;
              if (achouObj == "Chegou no nível pré-sal de validação JSON.") {
                cy.log(`\u2705 ${achouObj} equal ${"Chegou no nível pré-sal de validação JSON."} \u2705`)
              }else {
                cy.log(`\u274C ${achouObj} not equal ${"Chegou no nível pré-sal de validação JSON."} \u274C`)
              }
              let preSalInterno = maisFundoObj.pre_sal_interno;
              let chegandoInternoObj = preSalInterno.chegando;
              let achouInternoObj = chegandoInternoObj.achou;
              if (achouInternoObj == "Chegou no nível pré-sal-interno de validação JSON.") {
                cy.log(`\u2705 ${achouObj} equal ${"Chegou no nível pré-sal-interno de validação JSON."} \u2705`)
              }else {
                cy.log(`\u274C ${achouObj} not equal ${"Chegou no nível pré-sal-interno de validação JSON."} \u274C`)
              }
            }
          }
        }
      }
    }
  });
});
