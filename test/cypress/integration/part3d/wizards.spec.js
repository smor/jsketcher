/// <reference types="cypress" />

import * as PlaneTests from '../../../coreTests/testCases/craftPlane';
import * as ExtrudeBasicShapesTests from '../../../coreTests/testCases/craftExtrudeBasicShapes';
import * as ExtrudeOptionsTests from '../../../coreTests/testCases/craftExtrudeOptions';
import * as ExtrudeTests from '../../../coreTests/testCases/craftExtrude';
import * as CutTests from '../../../coreTests/testCases/craftCut';
import * as RevolveTests from '../../../coreTests/testCases/craftRevolve';
import * as FilletTests from '../../../coreTests/testCases/craftFillet';
import * as LoftTests from '../../../coreTests/testCases/craftLoft';
import * as DatumTests from '../../../coreTests/testCases/craftDatum';
import * as BooleanTests from '../../../coreTests/testCases/craftBoolean';

import {defineCypressTests} from "../../../coreTests/defineCypress";

describe("Wizrds", () => {


  beforeEach(() => {
    cy.openModeller();
  });

  // afterEach(() => {
  //   cy.screenshot();
  // });

  it("plane wizard should open", () => {
    cy.getActionButton('PLANE').click();
    cy.get('.wizard').should('have.attr', 'data-operation-id', 'PLANE');
    cy.getActiveWizardField('depth').find('input').type('100');
    cy.get('.wizard .dialog-ok').click();
    cy.selectRaycasting([-119, 29, 167], [23, -15, 33])
  });

  it("extrude wizard should work", () => {
    cy.getActionButton('PLANE').click();
    cy.get('.wizard').should('have.attr', 'data-operation-id', 'PLANE');
    cy.getActiveWizardField('depth').find('input').type('100');
    cy.get('.wizard .dialog-ok').click();
    cy.selectRaycasting([-119, 29, 167], [23, -15, 33]);
    cy.openSketcher().then(sketcher => {
      sketcher.addRectangle(0, 0, 80, 100);
      cy.commitSketch();
    });
    cy.getActionButton('EXTRUDE').click();
    cy.get('.wizard .dialog-ok').click();
    cy.selectRaycasting([-18, 67, 219], [120, 25, 81]);
    cy.get('.float-view-btn[data-view="selection"]').click();
    cy.get('.selection-view [data-entity="face"] li').should('have.text', 'S:1/F:5');

  });
  


  it("Simple fillet test", () => {
    createDatum(50, 50, 50);
    cy.simulateClickByRayCast([-31, 70, 117], [115, 36, -15]);
    createCylinder(50, 200, "<none>");
    
    cy.wait(1000);
    cy.simulateClickByRayCast([-32, 303, 127], [30, 201, -33]);
    //cy.wait(1000);
    
    createFillet(10);
    
    //click fillet face for test
    cy.wait(1000);
    cy.simulateClickFace([42, 281, 186], [20, 213, 0]);
    
    cy.get('.float-view-btn[data-view="selection"]').click();
    cy.get('.selection-view [data-entity="face"] li').should('have.text', 'S:1/F:1');
    
  });
  
  
  
  
  
  it.only("more complex fillet test", () => {
    createDatum(50, 50, 50);
    cy.simulateClickByRayCast([-31, 70, 117], [115, 36, -15]);
    createCylinder(50, 400, "<none>");
    
    cy.getActionButton('menu.views').click();
    cy.getActionButton('StandardViewBottom').click();
    
    
    createDatum(50, 50, 50);
    cy.simulateClickByRayCast([45, -50, 47], [53, 150, 55])
    createSphere(80, "UNION");
    
    
    cy.getActionButton('menu.views').click();
    cy.getActionButton('StandardView3Way').click();
    
    cy.simulateClickByRayCast([145, 174, 149], [27, 62, 33])
    
    createFillet(10);
    
    //click fillet face for test
    //cy.wait(1000);
    //cy.simulateClickFace([42, 281, 186], [20, 213, 0]);
    
    //cy.get('.float-view-btn[data-view="selection"]').click();
    //cy.get('.selection-view [data-entity="face"] li').should('have.text', 'S:1/F:1');
    
  });

  
  

  it("move datum", () => {
    createDatum(50, 50, 50);
    cy.simulateClickByRayCast([10, 15, 76], [154, -25, -56]);
    cy.getMenu('datum').within(() => {
      cy.getActionButton('DATUM_ROTATE').click()
    })


  });

});

function createDatum(locX, locY , locZ) {
  cy.getActionButton('DATUM_CREATE').click();
  
  cy.get('.wizard').should('have.attr', 'data-operation-id', 'DATUM_CREATE');
  
  cy.getActiveWizardField('x').find('input').clear().type(locX);
  cy.getActiveWizardField('y').find('input').clear().type(locY);
  cy.getActiveWizardField('z').find('input').clear().type(locZ);

  cy.get('.wizard .dialog-ok').click();
}

function createCylinder(sizeR, sizeH, boolOption){
  
  cy.getMenu('datum').within(() => {
    cy.getActionButton('CYLINDER').click()
  })
  
  cy.get('.wizard').should('have.attr', 'data-operation-id', 'CYLINDER');
  
  cy.getActiveWizardField('radius').find('input').clear().type(sizeR);
  
  cy.getActiveWizardField('height').find('input').clear().type(sizeH);
  
  cy.getActiveWizardField('boolean').find('select').select(boolOption);
  
  cy.get('.wizard .dialog-ok').click();

}



function createSphere(sizeR, boolOption){
  
  cy.getMenu('datum').within(() => {
    cy.getActionButton('SPHERE').click()
  })
  
  cy.get('.wizard').should('have.attr', 'data-operation-id', 'SPHERE');
  
  cy.getActiveWizardField('radius').find('input').clear().type(sizeR);
  
  cy.getActiveWizardField('boolean').find('select').select(boolOption);
  
  cy.get('.wizard .dialog-ok').click();

}




function createFillet(sizeR){
  cy.getActionButton('FILLET').click();
  
  cy.get('.wizard').should('have.attr', 'data-operation-id', 'FILLET');
  
  cy.getActiveWizardField('thickness').find('input').clear().type(sizeR);
  
  cy.get('.wizard .dialog-ok').click();
}