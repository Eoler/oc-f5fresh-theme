/*
 * Build project scripts and styles
 *
 * Installation (Node Package Manager):
 * > npm install --global gulp
 * > npm install --save-dev yargs chalk gulp gulp-include gulp-rename gulp-util gulp-notify gulp-sourcemaps gulp-uglify gulp-plumber gulp-sass gulp-autoprefixer gulp-minify-css
 *
 * Usage (GulpJS):
 * > gulp scripts [--src=<filename.es6> [--dest=<path/dirname>]]
 * > gulp styles [--src=<filename.scss> [--dest=<path/dirname>]]
 */
var
  // defaults
  defassets_dest = "assets/",
  defstyles_dest = defassets_dest+"css/",
  defvendor_srcdir = "assets/vendor/",
  defstylcss_srcdir = "assets/scss/",
  defstylcss_src = [
    defstylcss_srcdir+"foundation553.scss",
    defstylcss_srcdir+"app553.scss"
  ],
  defpostyles_src = [
    defstyles_dest+"foundation553.css",
    defstyles_dest+"app553.css"
  ],
  defscripts_dest = defassets_dest+"js/",
  defscripts_srcglb = "assets/es6/*.js";
  // global modules
  args = require('yargs').argv,
  gulp = require('gulp'),
  rename = require('gulp-rename');

var reportError = function(error){
 var
   gulptil = require('gulp-util'),
   notify = require('gulp-notify'),
   lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';
  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: lineNumber + 'See console.',
    sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);
  gulptil.beep();
  var report = '';
  var chalk = gulptil.colors.white.bgRed;
  report += chalk('TASK:') + ' [' + error.plugin + ']\n';
  report += chalk('PROB:') + ' ' + error.message + '\n';
  if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
  if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
  console.error(report);
  // Prevent the 'watch' task from stopping
  this.emit('end');
};

gulp.task('scripts', function(){
 var
   include = require('gulp-include'), // extend Javascript files with Sprockets syntax
   uglify = require('gulp-uglify'),
   srcfiles = args.src || defscripts_srcglb,
   destdir = args.dest || defscripts_dest;
  return gulp.src( srcfiles )
  .pipe( include() )
  .pipe( rename( function(fullname){ fullname.extname = ".js"; } ) )
  .pipe( gulp.dest( destdir ) )
  .pipe( rename( function(fullname){ fullname.extname = ".min.js"; } ) )
  .pipe( uglify( { preserveComments: "some" } ) )
  .pipe( gulp.dest( destdir ) )
});

gulp.task('styles', function(){
 var
   sourcemaps = require('gulp-sourcemaps'),
   sass = require('gulp-sass'),
   plumber = require('gulp-plumber'),
   autoprefixer = require('gulp-autoprefixer'),
   srcfiles = args.src || defstylcss_src,
   destdir = args.dest || defstyles_dest;
  return gulp.src( srcfiles )
  .pipe( plumber( { errorHandler: reportError } ) )
  .pipe( sourcemaps.init() )
  .pipe( sass( {
    errLogToConsole: true,
    outputStyle: 'nested',
    //sourceComments: true,
    sourceMapEmbed: false,
    includePaths: [
      defvendor_srcdir+"foundation/scss",
      defvendor_srcdir+"jQuery.mmenu/src"
    ] } ) )
  .on('error', function(err){} )
  .pipe( autoprefixer( { cascade: false, //map: true,
    browsers: ["last 3 versions", "iOS >= 6"] } ) )
  .pipe( sourcemaps.write( "./", {
    includeContent: false,
    sourceRoot: defstylcss_srcdir } ) )
  .pipe( gulp.dest( destdir ) )
});

gulp.task('postyles', /*['styles'],*/ function(){
 var
   minifycss = require('gulp-minify-css'),
   srcfiles = args.src || defpostyles_src,
   destdir = args.dest || defstyles_dest;
  return gulp.src( srcfiles )
  .pipe( minifycss( /*{ compatibility: "ie8" }*/ ) )
  .pipe( rename( { suffix: ".min" } ) )
  .pipe( gulp.dest( destdir ) )
});

gulp.task('default', ['scripts', 'postyles']);

gulp.task('watch', function(){
  gulp.watch( defscripts_srcglb, ['scripts'] );
  gulp.watch( defstyles_dest, ['postyles'] );
});
