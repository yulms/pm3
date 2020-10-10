'use strict';

const ghPages = require('gh-pages');
const fs = require('fs');


function createNojekyllFile() {
  fs.writeFileSync('build/.nojekyll', new Date);
}

function deploy(callback) {
  createNojekyllFile(); // необходимо только для GH Pages

  ghPages.publish('build',
    {
      dotfiles: true
    }, callback);
}


module.exports = deploy;
