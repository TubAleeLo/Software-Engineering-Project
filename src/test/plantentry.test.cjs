const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../plantEntryTest.html'), 'utf8');

const { window } = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.window = window;
global.document = window.document;

const { validatePlantName, validatePlantType } = require("../plantentry.js");

describe('Plant name and type validation', () => {

    describe('Plant name validation', () =>{
        it('should return false if the input is longer than 50 characters', () => {
            const plantNameInput = document.getElementById('plantName');
            plantNameInput.value = 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd';

            const result = validatePlantName();
            expect(result).to.be.false;
        });

        it('should return false if each word is not capitalized', () => {
            const plantNameInput = document.getElementById('plantName');
            plantNameInput.value = 'plant name';

            const result = validatePlantName();
            expect(result).to.be.false;
        });

        it('should return false if each hyphenated word is not capitalized', () => {
            const plantNameInput = document.getElementById('plantName');
            plantNameInput.value = 'Plant-name';

            const result = validatePlantName();
            expect(result).to.be.false;
        });

        it('should return true if each word is capitalized', () => {
            const plantNameInput = document.getElementById('plantName');
            plantNameInput.value = 'Plant Name';

            const result = validatePlantName();
            expect(result).to.be.true;
        });

        //test: 
    });

    describe('Plant type validation', () => {
        it('should return false if plant type is not in list', () =>{
            const plantTypeInput = document.getElementById('plantType');
            plantTypeInput.value = 'TypeD';

            const result = validatePlantType();
            expect(result).to.be.false;
        });
        it('should return true if plant type is in list', () =>{
            const plantTypeInput = document.getElementById('plantType');
            plantTypeInput.value = 'TypeA';

            const result = validatePlantType();
            expect(result).to.be.true;
        });
    });
});