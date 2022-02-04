const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.170.2.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const config = {
    host: 'HOST HERE',
    appId: 'APP ID HERE',
};
const url = SenseUtilities.buildUrl(config);
const session = enigma.create({ schema, url });

export default session.open().then((global) => global.openDoc(config.appId));
