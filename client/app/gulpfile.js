const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const html = require('html-loader');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');

const jsFiles = ['./*.js', 'app/**/*.js', '!node_modules/**'];
const clientScripts = ['app/js/temp_entry.js'];
const staticFiles = ['app/**/*.html'];
const sassFiles = ['app/**/styles.sass'];
// const testFiles = ['test/test_entry.js'];

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/temp_index.html')
    .pipe(gulp.dest(__dirname + '/build'));
});
//
// gulp.task('sass:dev', () => {
//   gulp.src(sassFiles)
//     .pipe(maps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(minifyCss())
//     .pipe(maps.write('./'))
//     .pipe(gulp.dest(__dirname + '/build'))
// });

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/js/temp_entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('lint', () => {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
          },
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('watch', () => {
  gulp.watch([jsFiles, staticFiles], ['build:dev']);
});

gulp.task('build:dev', ['watch', 'lint', 'html:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
