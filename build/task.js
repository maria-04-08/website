const gulp = require("gulp");
const rename = require("gulp-rename");
const del = require("del");
const replaceStr = require("gulp-replace");

//"gulp-replace-pro"

const {
  from,
  output,
  sassMode,
  autoprefixerConfig
} = require('./config.js');

const {
  getParams,
  htmlModulePath
} = require('./utils.js');

// 新建
gulp.task('add', () => {
  const [ folder, file ] = getParams()[1].slice(2).split('/');
  const root = './build/files';
  const config = {
    pages: {
      source: '/pages.html',
      entry: 'pages',
      output: 'pages'
    },
    sass: {
      source: '/sass.scss',
      entry: 'sass',
      output: 'css'
    },
    js: {
      source: '/script.js',
      entry: 'js',
      output: ''
    }
  }

  Object.keys(config).forEach(key => {
    const { source, entry } = config[key];
    
    if (entry === 'pages') {
      const cssFile = `../../css/${folder}/${file}.css`;
      const jsFile = `../../js/${folder}/${file}.min.js`;
      gulp.src(root + source)
        .pipe(replaceStr('$replace-css', cssFile))
        .pipe(replaceStr('$replace-js', jsFile))
        .pipe(rename({
          basename: file
        }))
        .pipe(gulp.dest(`src/${entry}/${folder}`))
    } else {
      gulp.src(root + source)
        .pipe(rename({
          basename: file
        }))
        .pipe(gulp.dest(`src/${entry}/${folder}`))
    }
  })
})
