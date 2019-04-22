require("babel-polyfill");
const gulp = require("gulp");
// const proxyMiddleware = require('http-proxy-middleware');
const sass = require("gulp-sass");
const changed = require("gulp-changed");
const babel = require("gulp-babel");
const removeUseStrict = require("gulp-remove-use-strict");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const htmlReplace = require("gulp-html-replace");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const replaceStr = require("gulp-replace");

const {
  from,
  output,
  sassMode,
  autoprefixerConfig
} = require('./config.js');

const {
  getParams,
  getPort,
  htmlModulePath
} = require('./utils.js');

const ENV = 'development';
let isTest = false;

const devJs = (_from, _to) => {
  if (isTest) {
    console.log('...test');
    return gulp.src(_from)
      //转ES5
      .pipe(babel({
        presets: ["es2015", "es2016", "es2017"]
      }))
      //去除严格模式
      .pipe(removeUseStrict())
      //重命名
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(changed(`dev/${_to}`))
      //编译输出
      .pipe(gulp.dest(`dev/${ _to }`))
  } else {
    return gulp.src(_from)
      //重命名
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(changed(`dev/${_to}`))
      //编译输出
      .pipe(gulp.dest(`dev/${ _to }`))
  }
}

// 清理文件夹
gulp.task("devClean", () => {
  isTest = getParams('--t') || getParams('--test');
  return del(["dev/**/*", "./index.html"]);
})

// 首页
gulp.task("devIndex", () => {
  return gulp.src(from.indexPage)
    .pipe(htmlReplace({
      metaComponent: gulp.src(htmlModulePath(ENV).meta),
      cssComponent: gulp.src(htmlModulePath(ENV).css),
      scriptComponent: gulp.src(htmlModulePath(ENV).script)
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(output.indexPage));
})

// html
gulp.task("devHtml", () => {
  return gulp.src(from.html)
    .pipe(htmlReplace({
      metaComponent: gulp.src(htmlModulePath(ENV).meta),
      cssComponent: gulp.src(htmlModulePath(ENV).css),
      scriptComponent: gulp.src(htmlModulePath(ENV).script)
    }))
    .pipe(changed(`dev/${output.html}`))
    .pipe(gulp.dest(`dev/${output.html}`));
})

// 编译sass
gulp.task("devSass", () => {
  return gulp.src(from.sass)
    .pipe(sass({
      outputStyle: sassMode.expanded
    }).on("error", sass.logError))

    .pipe(changed(`dev/${output.sass}`))
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(gulp.dest(`dev/${output.sass}`))
})

// js
gulp.task("devJs", () => devJs(from.js, output.js));

// tools
gulp.task("devTools", () => devJs(from.tools, output.tools));

// components
gulp.task("devComponent", () => devJs(from.component, output.component));

// lib
gulp.task("devLib", () => {
  return gulp.src(from.lib)
    .pipe(gulp.dest(`dev/${output.lib}`))
})

// img
gulp.task("devImg", () => {
  return gulp.src(from.img)
    .pipe(changed(`dev/${output.img}`))
    .pipe(gulp.dest(`dev/${output.img}`))
})

gulp.task("jt", () => {

  //自动刷新浏览器
  browserSync.init({
    server: {
      baseDir: "./",
      middleware: []
    },
    ui: false,
    notify: false,
    open: false,
    files: ["src/**/*"],
    port: getPort() || 2020,
    ghostMode: {
      clicks: false,
      forms: true,
      scroll: false
    }
  });

  gulp.watch(from.html, ["devHtml"]);
  gulp.watch(from.indexPage, ["devIndex"]);
  gulp.watch(from.commonHtml, ["devHtml", "devIndex"]);
  gulp.watch(from.img, ["devImg"])
  gulp.watch(from.js, ["devJs"]);
  gulp.watch(from.sass, ["devSass"])
  gulp.watch(from.tools, ["devTools"]);
  gulp.watch(from.component, ["devComponent"]);
})

// 初始化
gulp.task("dev", ["devClean"], () => {
  return gulp.start(["devImg", "devLib", "devTools", "devComponent", "devJs", "devSass", "devHtml", "devIndex"], ["jt"]);
})
