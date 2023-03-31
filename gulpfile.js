var gulp = require("gulp");
var babel = require("gulp-babel");
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("js", function () {
 return gulp.src(['node_modules/granim/dist/granim.js', "src/script.js"])
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(babel({
   presets: ["@babel/preset-env"]
  }))
  .pipe(gulp.dest("dist"));
});