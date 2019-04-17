require("babel-polyfill");
const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const removeUseStrict = require("gulp-remove-use-strict");
const stripDebug = require("gulp-strip-debug");
const rename = require("gulp-rename");
const htmlReplace = require("gulp-html-replace");
const autoprefixer = require("gulp-autoprefixer");
const rev = require("gulp-rev");
const revCollector = require("gulp-rev-collector");
const del = require("del");
const replace = require("gulp-url-replace");
const replaceStr = require("gulp-replace");
const htmlmin = require('gulp-htmlmin');

const {
  from,
  output,
  autoprefixerConfig,
  sassMode
} = require('./config.js');

const {
  htmlModulePath
} = require('./utils.js');

const ENV = 'product';

// 清空输出目录
gulp.task("buildClean", () => {
  return del(["dist/**/*", "rev/**/*"]);
})

// 复制第三方库文件
gulp.task("buildLib", ["buildClean"], () => {
  return gulp.src(from.lib)
    .pipe(gulp.dest(`dist/web/${ output.lib }`))
})

// 复制图片
gulp.task("buildImg", ["buildLib"], () => {
  return gulp.src(from.img)
    .pipe(gulp.dest(`dist/web/${ output.img }`))
})

function buildJs(_from, _to) {
  const  opts = {
    presets: ['es2015', 'es2016', 'es2017']
  };
  
  return gulp.src(_from)
    .pipe(babel(opts))
    .pipe(removeUseStrict())
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(rev()) // 文件md5打码
    .pipe(gulp.dest(`dist/web/${ _to }`)) // 输出打码文件
    .pipe(rev.manifest()) // 生成打码目录
    .pipe(gulp.dest(`rev/${ _to }`)); // 输出打码目录
}

// 打码js
gulp.task("revJs", ["buildImg"], () => buildJs(from.js, output.js));

// components
gulp.task("revComponent", ["revJs"], () => buildJs(from.component, output.component));

// 打码工具类
gulp.task("revTools", ["revComponent"], () => buildJs(from.tools, output.tools));

// 打码interface
gulp.task("revApi", ["revTools"], () => buildJs(from.interface, output.interface));

// 打码sass
gulp.task("revSass", ["revApi"], () => {
  return gulp.src(from.sass)
    .pipe(sass({
      outputStyle: sassMode.compressed
    }).on("error", sass.logError))
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(replace({
      "(\.\.\/)*img\/cdn\/.*\/": "http://ow.pic.alasga.cn/",
    }))
    .pipe(rev())
    .pipe(gulp.dest(`dist/web/${ output.sass }`))
    .pipe(rev.manifest())
    .pipe(gulp.dest(`rev/${ output.sass }`));
})



// 合并html组件
gulp.task("revHtml", ["revSass"], () => {
  return gulp.src("src/pages/**/*.html")
    .pipe(htmlReplace({
      metaComponent: gulp.src(htmlModulePath(ENV).meta),
      cssComponent: gulp.src(htmlModulePath(ENV).css),
      scriptComponent: gulp.src(htmlModulePath(ENV).script)
    }))
    .pipe(htmlmin({
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      sortAttributes: true,
      sortClassName: true,
      keepClosingSlash: true
    }))
    .pipe(replace({
      "(\.\.\/)*img\/cdn\/.*\/": "http://ow.pic.alasga.cn/",
    }))
    .pipe(gulp.dest(`rev/${ output.html }`));
})

// 替换路径
gulp.task("replacePath", ["revHtml"], () => {
  return gulp.src([
      "./rev/**/*.json",
      "./rev/**/*.html"
    ])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest("dist/web"));
})

// 输出首页
gulp.task("outputIndex", ["replacePath"], () => {
  return gulp.src("dist/web/pages/home/home.html")
    .pipe(replaceStr("dev/pages", "web/pages"))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("./dist"))
})

gulp.task("build", () => {
  gulp.start(["outputIndex"]);
})
