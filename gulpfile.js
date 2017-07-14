/*
 * Build project assets for development and production
 *
 * Installation (Node Package Manager):
 * > npm install --global gulp bower
 * > npm install && bower install
 *
 * Usage (GulpJS):
 * > gulp styles  [--production][--src=<filepath/filename.scss> [--dest=<path/dirname>]]
 * > gulp scripts [--production][--src=<filepath/filename.js> [--dest=<path/dirname>]]
 */
'use strict';
var // defaults
    defassets_srcdir = "assets/",
    defvendor_srcdir = defassets_srcdir+"vendor/",
    defstyles_srcdir = defassets_srcdir+"scss/",
    defstyles_srcglb = defstyles_srcdir+"*.scss",
    defscripts_srcglb = defassets_srcdir+"es6/*.js",
    defassets_destdir = defassets_srcdir,
    defstyles_destdir = defassets_destdir+"css/",
    defscripts_destdir = defassets_destdir+"js/",
    // global modules
    args = require('yargs').argv,
    pump = require('pump'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename');

gulp.task('default', ['styles', 'scripts']);

gulp.task('styles', function(cb){
var sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    srcfiles = args.src || defstyles_srcglb,
    destdir = args.dest || defstyles_destdir;
  pump([ gulp.src( srcfiles ),
    sourcemaps.init(),
    sass( {
        errLogToConsole: true,
        outputStyle: 'nested',
        //sourceComments: true,
        sourceMapEmbed: false,
        includePaths: [
          defvendor_srcdir+"foundation/scss"
        ] } ),
    autoprefixer( {
        cascade: false,
        //map: true,
        browsers: ["last 2 versions", "iOS >= 7"] } ),
    sourcemaps.write( "./", {
        includeContent: false,
        sourceRoot: "../scss" } ),
    gulp.dest( destdir ),
    gulpif(args.production, rename( { suffix: ".min" } ) ),
    gulpif(args.production, cleancss() ),
    gulpif(args.production, gulp.dest( destdir ) )
  ], cb);
});

gulp.task('scripts', function(cb){
var include = require('gulp-include'), // extend source files with Sprockets syntax
    uglify = require('gulp-uglify'),
    srcfiles = args.src || defscripts_srcglb,
    destdir = args.dest || defscripts_destdir;
  pump([ gulp.src( srcfiles ),
    include(),
    gulp.dest( destdir ),
    gulpif(args.production, rename( function(fullname){ fullname.extname = ".min.js"; } ) ),
    gulpif(args.production, uglify( { output: { comments: "/^!/" } } ) ),
    gulpif(args.production, gulp.dest( destdir ) )
  ], cb);
});

gulp.task('upbuild', ['styles', 'scripts'], function(cb){
var fs = require('fs'),
    yaml = require('js-yaml'),
    srcfile = args.src || defassets_destdir+"../fields.yaml";
  if (fs.existsSync(srcfile)) {
    var obyaml = yaml.safeLoad( fs.readFileSync( srcfile, "utf8" ), { json: true } );
    obyaml.fields.version.default++;
    fs.writeFileSync( srcfile, yaml.dump( obyaml, { indent: 4 } ) );
  }
});

gulp.task('watch', function(){
    gulp.watch( [defstyles_srcglb], ['styles'] );
    gulp.watch( [defscripts_srcglb], ['scripts'] );
});
