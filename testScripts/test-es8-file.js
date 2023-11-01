import {connexion, logout} from "../templates/common/connexion";
import {selectChannel} from "../templates/common/selectChannel";

describe('Suite 0001', function () {

    it('Test 0001 1', {identifiers: ['GEPICM-19']}, function () {
        connexion();
        const channelName = "telesales";
        selectChannel(channelName).then(channel => {
            cy.reload();
            cy.get("a[href='/channel'] p").should('include.text', channel);
        });
    })

    it('Test 0001 2', {identifiers: ['GEPICM-17']}, function () {
        connexion();
        const channelName = "telesales";
        selectChannel(channelName).then(channel => {
            cy.get("a[href='/channel'] p").should('include.text', channel);
            logout();
            connexion({
                username: Cypress.env('KEYCLOAK_AGENT_INT_CARE_EMAIL'),
            })
            cy.get("a[href='/channel'] p").should('not.include.text', channel);
        });
    })

})