/*
 * Build project scripts and styles
 *
 * Installation (Node Package Manager):
 * > npm install --global gulp
 * > npm install --save-dev yargs gulp gulp-rename gulp-include gulp-uglify gulp-sourcemaps gulp-sass gulp-autoprefixer gulp-minify-css
 *
 * Usage (GulpJS):
 * > gulp scripts [--src=<filename.es6> [--dest=<path/dirname>]]
 * > gulp styles [--src=<filename.scss> [--dest=<path/dirname>]]
 */
'use strict';
var
  // defaults
  defassets_dir = "assets/",
  defvendor_srcdir = defassets_dir+"vendor/",
  defstylcss_srcdir = defassets_dir+"scss/",
  defstylcss_src = [
    defstylcss_srcdir+"foundation553.scss",
    defstylcss_srcdir+"styleguide.scss"
  ],
  defstyles_destdir = defassets_dir+"css/",
  defpostyles_src = [
    defstyles_destdir+"foundation553.css",
    defstyles_destdir+"styleguide.css"
  ],
  defscripts_srcglb = defassets_dir+"es6/*.js",
  defscripts_destdir = defassets_dir+"js/",
  // global modules
  args = require('yargs').argv,
  gulp = require('gulp'),
  rename = require('gulp-rename');

gulp.task('scripts', ()=>{
var
  include = require('gulp-include'), // extend Javascript files with Sprockets syntax
  uglify = require('gulp-uglify'),
  srcfiles = args.src || defscripts_srcglb,
  destdir = args.dest || defscripts_destdir;
  return gulp.src( srcfiles )
  .pipe( include() )
  .pipe( gulp.dest( destdir ) )
  .pipe( uglify( { preserveComments: "license" } ) )
  .pipe( rename( function(fullname){ fullname.extname = ".min.js"; } ) )
  .pipe( gulp.dest( destdir ) )
});

gulp.task('styles', ()=>{
var
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  srcfiles = args.src || defstylcss_src,
  destdir = args.dest || defstyles_destdir;
  return gulp.src( srcfiles )
  .pipe( sourcemaps.init() )
  .pipe( sass( {
    errLogToConsole: true,
    outputStyle: 'nested',
    //sourceComments: true,
    sourceMapEmbed: false,
    includePaths: [
      defvendor_srcdir+"foundation/scss",
      defvendor_srcdir+"jQuery.mmenu/src"
    ] } )/*.on('error', sass.logError)*/ )
  .pipe( autoprefixer( {
    cascade: false,
    //map: true,
    browsers: ["last 3 versions", "iOS >= 6"] } ) )
  .pipe( sourcemaps.write( "./", {
    includeContent: false,
    sourceRoot: defstylcss_srcdir } ) )
  .pipe( gulp.dest( destdir ) )
});

gulp.task('postyles', /*['styles'],*/ ()=>{
 var
   minifycss = require('gulp-minify-css'),
   srcfiles = args.src || defpostyles_src,
   destdir = args.dest || defstyles_destdir;
  return gulp.src( srcfiles )
  .pipe( minifycss( /*{ compatibility: "ie8" }*/ ) )
  .pipe( rename( { suffix: ".min" } ) )
  .pipe( gulp.dest( destdir ) )
});

gulp.task('default', ['scripts', 'styles', 'postyles']);

gulp.task('watch', ()=>{
  gulp.watch( defscripts_srcglb, ['scripts'] );
  gulp.watch( defstylcss_src, ['styles'] );
  gulp.watch( defstyles_destdir, ['postyles'] );
});
