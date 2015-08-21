var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var converter = require('sass-convert');
var sassdoc = require('sassdoc');

var SASSinput = 'sass/**/*.sass'
var SASSoutput = 'dist/css'

// Compile SASS to CSS
gulp.task('sass', function() {
  return gulp
    // Find all '.sass' files from the 'SASSinput' folder
    .src(SASSinput)
    // Run Sass on those files
    .pipe(sass().on('error', sass.logError))
    // Add relevant prefixes to the stylesheets
    .pipe(autoprefixer('last 3 version'))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(SASSoutput))
    // Reload browsers
    // .pipe(browserSync.stream());
});

gulp.task('sass-to-scss', function(){
    gulp.src('sass/**/*.+(sass|scss)')
        .pipe(converter({
            from: 'sass',
            to: 'scss',
            rename: true,
        }))
        .pipe(gulp.dest('scss'));
    return
});

gulp.task('sassdoc', ['sass-to-scss'], function(){
    gulp.src('scss/**/*.scss')
        .pipe(sassdoc({
            dest: 'docs/'
        }));
    return
});

gulp.task('watch-sass', function() {
    gulp.watch(SASSinput, ['sass','sassdoc'])
})
