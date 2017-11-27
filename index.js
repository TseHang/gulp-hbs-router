const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');
const through = require('through2');
const gutil = require('gulp-util');
const chalk = require('chalk');
const htmlMinify = require('html-minifier').minify;

const PLUGIN_NAME = 'gulp-hbs-router';
const pluginError = msg => new gutil.PluginError(PLUGIN_NAME, msg);

const gulpHbsRouter = (opts = {}) => {
  // Handle configuration options
  const CWD_PAH = '../../';
  const DEFAULT_ROUTER_PATH = 'hbsRouter.js';
  const DEFAULT_PARTIAL_PATH = 'partial.js';

  const cwdPath = opts.cwdPath || CWD_PAH;
  const routerPath = opts.routerPath || DEFAULT_ROUTER_PATH;
  const partialPath = opts.partialPath || DEFAULT_PARTIAL_PATH;
  const compile = opts.compile || hbs.compile;
  const minify = opts.minify || false;
  
  const router = require(`${cwdPath}${routerPath}`);
  const registerPartial = require(`${cwdPath}${partialPath}`);

  const allowExtensions = ['.hb', '.hbs', '.handlebars', '.html'];
  const isHandlebars = fileExtName => allowExtensions.indexOf(fileExtName) !== -1;

  // Process input files one at a time
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
    } else if (file.isBuffer()) {
      Promise
        .resolve(file)
        .then(function (file) {
          const templateData = router[getTemplateName(file)];
          if (!templateData) {
            process.stdout.write(chalk.gray(`    compile '${getFilePathName(file)}'\n`));
            return;
          }
          return compileHbs(file, templateData);
        })
        .then(
          (file) => { cb(null, file); },
          (err) => { cb(err, null); }
        );
    } else if (file.isStream()) {
      cb(pluginError('Streaming not supported'));
    } else {
      cb(pluginError('Unsupported file contents type!'));
    }
  });

  function compileHbs(file, templateData) {
    registerPartial(hbs);
    const fileContents = file.contents.toString();
    const template = hbs.compile(fileContents, opts.compile);
    let html = template(templateData);
    
    if (minify) {
      const minifyOpts = {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      };
      html = htmlMinify(html, minifyOpts);
    }

    file.path = gutil.replaceExtension(file.path, '.html'); // index.
    file.contents = new Buffer(html, 'utf-8');
    process.stdout.write(chalk.green(`    write '${getFilePathName(file)}'\n`));
    return file;
  }

  function getTemplateName(file) {
    const fileName = file.relative; // index.hbs
    const extName = path.extname(file.path); // .hbs
    if (!isHandlebars(extName)) throw pluginError('You input a FAULT source !!!\n    Checking your gulp.src(...)');
    return fileName.slice(0, (-extName.length)); // index
  }

  function getFilePathName(file) {
    return file.path.replace(file.base, '');
  }
};

gulpHbsRouter.registerHelper = (name, helper) => {
  hbs.registerHelper(name, helper);
};

module.exports = gulpHbsRouter;
