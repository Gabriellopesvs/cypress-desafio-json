/// <reference types="cypress" />

import request from "request";

export class Requests {

    async Requisitions(router) {

        let req = {
            method: 'GET',
            url: `${router}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await new Promise((resolve, reject) => {
            request(req, (error, response, body) => {
                if (error) {
                    cy.task("log", `+++++${error}`);
                    reject(null);
                } else {
                    cy.task('log', `+++++${body}`);
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    async doRequest(env) {
        // let json = await this.Requisitions(env)
        // cy.get(json).as('response')

        return await cy.request({
            method: 'GET',
            url: env,
            failOnStatusCode: false,

            headers: {
                'Content-Type': 'application/json'
            }
        }).should('have.property', 'body').then((res) => {
            this.cyLog('info', JSON.stringify(res))
        })
            .as('response')
    }

    ExpectAssert(param, ...equal) {
        expect(param).to.exist
        expect(param).to.not.null
        expect(param).to.not.undefined


        if (equal.length >= 1) {
            for (let property of equal) {
                if (param === property) {
                    this.cyLog('check', `${param} equal ${property}. OK`)
                    expect(param).eq(property)
                    break;
                } else {
                    this.cyLog('error', `${property} not equal ${param}`)
                }
            }
        }
        return expect(param)
    }


    // log expression

    cyLog(type, message) {
        let check = "✅ ";
        let error = "🛑 ";
        let alert = "⚠️ ";
        let info = "📝 ";
        let text = "📋 ";
        let start = "▶️ ";

        if (type === "check") {
            return cy.task(`**[${check} ${message}]()**`);
        } else if (type === "error") {
            return cy.log(`${error} ${message}`);
        } else if (type === "alert") {
            return cy.log(`${alert} ${message}`);
        } else if (type === "info") {
            return cy.log(`*${info} ${message}*`);
        } else if (type === "start") {
            return cy.log(`${start} ${message}`);
        } else {
            return cy.log(`${text} ${message}`);
        }
    }
}