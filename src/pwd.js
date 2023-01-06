'use strict';
const sha256 = require('../node_modules/crypto-js/sha256.js');

const fs = require('fs');
function encodePassword(password) {
  return '$' + sha256('enl' + password);
}

function encodePasswordFile(fn) {
  const file = require(fn);
  var ar = [];
  for (let index = 0; index < file.length; index += 1) {
    const user = file[index];
    if (user.password.indexOf('$') === 0) {
      ar.push({...user});
    } else {
      ar.push({...user, password: encodePassword(user.password)});
    }
  }
  fs.writeFileSync('src/' + fn.substring(0, fn.length-5) + '.enc.json', JSON.stringify(ar, null, 2));
}

encodePasswordFile('./stores/mock/data/user/list.dev.json');
encodePasswordFile('./stores/mock/data/user/list.prod.json');



