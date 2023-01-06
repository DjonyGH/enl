'use strict';

const fs = require('fs');
let buff1 = fs.readFileSync(`src/stores/templates/templateModeNeutral.docx`);
let buff2 = fs.readFileSync(`src/stores/templates/templateModePartial.docx`);
let buff3 = fs.readFileSync(`src/stores/templates/templateModeGood.docx`);
let buff4 = fs.readFileSync(`src/stores/templates/templateModeBad.docx`);
let buff5 = fs.readFileSync(`src/stores/templates/templateBenefitGood.docx`);
let buff6 = fs.readFileSync(`src/stores/templates/templateBenefitBad.docx`);
let buff7 = fs.readFileSync(`src/stores/templates/templateBenefitNeutral.docx`);
let base64data = '{ "templateModeNeutral": "' + buff1.toString('base64') + '", "templateModePartial": "' + buff2.toString('base64') + '", "templateModeGood": "' + buff3.toString('base64') + '", "templateModeBad": "' + buff4.toString('base64') + '", "templateBenefitNeutral": "' + buff7.toString('base64') + '", "templateBenefitBad": "' + buff6.toString('base64')+ '", "templateBenefitGood": "' + buff5.toString('base64') + '" }';
fs.writeFileSync('src/stores/templates/template.json', base64data);
