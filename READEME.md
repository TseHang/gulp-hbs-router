# gulp-hbs-router
Gulp plugin that runs like a router, converting templat language into HTML.

### Install
```htmlembedded=
npm install gulp-hbs --save-dev
```

### Usage
```javascript=
const gulpHbsRouter = require('gulp-hbs-router);

gulp.src('./layout/**/*.hbs')
    .pipe(gulpHbsRouter({
	    cwdPath: '../',
	    routerPath: 'hbsRouter.js',
	    partialPath: 'partial.js',
	    minify: true,
	    compile: {},
    }))
    .pipe(gulp.dest('./'))
```

#### You have to reate `./hbsRouter.js` `./partial.js`
- **hbsRouter.js** : Listing all Templata DATA here.
You can set data(object) in this file, and each data correspond into its file **independently**.
`Default: './hbsRouter.js'.`

- **partial.js** : You should write your partial  here. Then, router will catch partial by this file in handlebars.
`Default: './partial.js'.`

## options
- **cwdPath** (default `'../'`)

In gulp-hbs-router, we should get data from `'hbsRouter.js'` and partial from `'partial.js'` , so we need to set the `cwdPath`

- **routerPath** (default `'hbsRouter.js'`)

set router's path.

- **partialPath** (default `'partial.js'`)

set partial's path.

- **minify** (default `false`)

set to minify html.

- **compile** (default to `handlebars.compile`)

compile options. See [handlebars reference](http://handlebarsjs.com/reference.html#base-compile) for possible values

- **halpers** (default to `handle`)

javascript functions to stand in for helpers used in the handlebars files.

## Example



## License

[MIT](https://opensource.org/licenses/MIT) © [TsaHang](https://github.com/TseHang)





