var gulp = require("gulp"),
  babelify = require("babelify"),
  browserify = require("browserify"),
  connect = require("gulp-connect"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps");
cssnano = require("gulp-cssnano");

gulp.task("js", function () {
  return browserify({
    entries: ["./src/script.js"],
  })
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
      })
    )
    .bundle()
    .pipe(source("script.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("css", function () {
  return gulp
    .src(["src/style.css"])
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(gulp.dest("dist"));
});
