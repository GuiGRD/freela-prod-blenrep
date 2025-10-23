"use strict";

/**
 * Gulpfile
 *
 * Implements:
 *      1.
 *      2.
 *      3.
 *
 */

/**
 * Load Gulp Configuration.
 */
const config = require("./gulp.config.js");

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const header = require("gulp-header");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const gulpImagemin = require("gulp-imagemin");

// Load package.json for banner
const pkg = require("./package.json");

// Set the banner content
const banner = [
  "/*!\n",
  " * GSK | Blenrep - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright " + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " */\n",
  "\n",
].join("");

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const browserSync = (done) => {
  browsersync.init({
    proxy: config.projectURL,
    open: config.browserAutoOpen,
    // injectChanges: config.injectChanges,
    // watchEvents: ["change", "add", "unlink", "addDir", "unlinkDir"],
  });
  done();
};

// BrowserSync reload - Helper function to allow browser reload with Gulp 4.
const browserSyncReload = (done) => {
  browsersync.reload();
  done();
};

/**
 * Task: `styles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. ....
 *    2. ....
 *    3. ....
 */
function styles() {
  return gulp
    .src(config.styleSRC)
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: config.outputStyle,
        includePaths: "./node_modules",
      })
    )
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      header(banner, {
        pkg: pkg,
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.styleDestination))
    .pipe(browsersync.stream());
}

// TASK JS
function js() {
  return gulp
    .src(config.jsCustomSRC, { allowEmpty: true }) // Only run on changed files.
    .pipe(uglify())
    .pipe(
      header(banner, {
        pkg: pkg,
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(config.jsCustomDestination))
    .pipe(browsersync.stream());
}

// TASK IMG
function img() {
  return gulp
    .src("./img-src/**/*")
    .pipe(
      gulpImagemin([
        gulpImagemin.gifsicle({ interlaced: true }),
        gulpImagemin.mozjpeg({ quality: 90, progressive: true }),
        gulpImagemin.optipng({ optimizationLevel: 8 }),
        gulpImagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("./assets/img"));
}

// Watch files
function watchFiles() {
  gulp.watch(config.watchStyles, gulp.parallel(browserSyncReload, styles));
  gulp.watch(config.watchJsCustom, js);
  // gulp.watch("./img-src/**/*", img);
  gulp.watch(config.watchPhp, browserSyncReload);
  gulp.watch(config.watchHtml, browserSyncReload);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(styles, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.styles = styles;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
