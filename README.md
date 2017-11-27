# gulp-hbs-router
[![NPM version][npm-image]][npm-url]
> Gulp plugin that runs like a router, converting template language into HTML.

##### Why you need?
- When you don't want to use some frontend framwork like react, vue, angular...
cuz your website actually isn't need it...
- Multiple pages controlled by module.
- If you are a senior frontend-er. You should try!

### Install
```
npm install gulp-hbs-router --save-dev
```

### Usage
```javascript
const gulpHbsRouter = require('gulp-hbs-router');

gulp.src('./layout/**/*.hbs')
    .pipe(gulpHbsRouter({
	    cwdPath: `${__dirname}/`,
	    routerPath: 'hbsRouter.js',
	    partialPath: 'partial.js',
	    minify: true,
    }))
    .pipe(gulp.dest('./'))
```

#### You have to create `./hbsRouter.js` `./partial.js`
- **hbsRouter.js** : Listing all Templata DATA here.
You can set data(object) in this file, and each data correspond into its file **independently**.
<br>`Default: './hbsRouter.js'.`

- **partial.js** : You should write your partial  here. Then, router will catch partial by this file in handlebars.
<br>`Default: './partial.js'.`

##### How to write? Look [Example](#example).

## API
### gulpHbsRouter([, options])
- **cwdPath** (default `../../`)
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

### `gulpfile.js`
```javascript
const gulp = require('gulp');
const gulpHbsRouter = require('gulp-compile-handlebars');
const gulpPlumber = require('gulp-plumber');

gulp.task('hbs', () => {
  gulp.src(['./layout/**/*.hbs'])
    .pipe(gulpPlumber())
    .pipe(gulpPlumber())
    .pipe(gulpHbsRouter({
	  cwdPath: `${__dirname}/`,
      minify: true,
    }))
    .pipe(gulp.dest('./'));
})
```

### `./hbsRouter.js`
```javascript
const hbsRouter = {
  home: {
    description: 'I love home.',
    title: 'Home',
  },
  index: {
    description: 'Simple router',
    title:'Gulp-Hbs-Router Example',
  }
};

module.exports = hbsRouter;
```

### `./partial.js`
```javascript
const fs = require('fs');
const DEFAULT_PATH = 'partial/';

module.exports = (hbs) => {
  hbs.registerPartial('head', getPartials('head.hbs', DEFAULT_PATH));
  hbs.registerPartial('footer', getPartials('footer.hbs', DEFAULT_PATH));
};

function getPartials(filename, path) {
  const template = fs.readFileSync(`./layout/${path}${filename}`, 'utf8');
  return template;
}
```

### `./layout/index.hbs` `./layout/home.hbs`
```html
<head>
  {{> head}}
  <title>{{title}}</title>
</head>
<body>
  <h1>Hi, {{title}}</h1>
  {{> footer}}
</body>
```

### `./layout/partial/head.hbs`
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
<meta htt0-equiv = "X-UA-Compatible" content = "IE=edge">
<meta name="description" content="{{description}}" >
```

### `./layout/partial/footer.hbs`
```html
<footer>
  <h1>The end!</h1>
</footer>
```

### You have to add in STRUCTURE
```
...

- gulpfile.js
- hbsRouter.js
- partial.js
- layout/
	- index.hbs
	- home.hbs

	partial/
		- head.hbs
		- footer.hbs

...
```

## License

[MIT](https://opensource.org/licenses/MIT) © [TsaHang](https://github.com/TseHang)

[npm-image]: https://badge.fury.io/js/gulp-hbs-router.svg
[npm-url]: https://www.npmjs.com/package/gulp-hbs-router



