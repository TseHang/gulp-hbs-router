# gulp-hbs-router
Gulp plugin that runs like a router, converting templat language into HTML.

### Install
```htmlembedded=
npm install gulp-hbs --save-dev
```

### Usage
```javascript
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
<br>`Default: './hbsRouter.js'.`

- **partial.js** : You should write your partial  here. Then, router will catch partial by this file in handlebars.
<br>`Default: './partial.js'.`

## API
### gulpHbsRouter([, options])
- **cwdPath** (default `'../'`)
<br>In gulp-hbs-router, we should get data from `'hbsRouter.js'` and partial from `'partial.js'` , so we need to set the `cwdPath`

- **routerPath** (default `'hbsRouter.js'`)
<br>set router's path.

- **partialPath** (default `'partial.js'`)
<br>set partial's path.

- **minify** (default `false`)
<br>set to minify html.

- **compile** (default to `handlebars.compile`)
<br>compile options. See [handlebars reference](http://handlebarsjs.com/reference.html#base-compile) for possible values

### gulpHbsRouter.registerHelper(name, helperFn)
Register a handlebars [helper](http://handlebarsjs.com/#helpers).

## Example


## License

[MIT](https://opensource.org/licenses/MIT) © [TsaHang](https://github.com/TseHang)





