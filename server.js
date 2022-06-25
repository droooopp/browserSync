const browserSync = require('browser-sync');
const fs = require('fs');
const path = require('path');

browserSync.init({
  server: './dist',
  files: './dist/**/*',
  rewriteRules: [
    {
      match: /<!--#include virtual="(.+?)" -->/g,
      fn: function(req, res, match, filename) {
        const filePath = path.join(`./dist/${filename}`);
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath);
        } else {
          return `${filePath} could not be found`;
        }
      }
    }
  ]
});
