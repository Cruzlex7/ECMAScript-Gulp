require("babel-register");

import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import  plumber from 'gulp-plumber';

import { Jade2HTMLTransformer } from './transformers/jade2HTMLTransformer';


let jade2htmlTransformer = new Jade2HTMLTransformer({ pretty: true })

const paths = {
    src: {
        eslint: './src/**/*.js',
        js: './src/index.js',
        pug: './src/pugTemplates/*.pug'
    },
    build: {
        test: {
            js: './build/dev/js',
            pug: './build/dev/html'
        },
        production: {
            js: './build/dist/js',
            pug: './build/dist/html'
        }
    }
}

gulp.task('transpilar-test', () => {
    gulp
        .src(paths.src.eslint)
        .pipe(plumber())
        .pipe(babel())        
        .pipe(gulp.dest(paths.build.test.js))
})

gulp.task('transpiling', () => {
    gulp
        .src(paths.src.eslint)
        .pipe(plumber())
        .pipe(babel())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build.production.js))
})

gulp.task('pugCompiler-test', () => {
    jade2htmlTransformer.transform(paths.src.pug, paths.build.test.pug)
})

gulp.task('pugCompiler', () => {
    jade2htmlTransformer.transform(paths.src.pug, paths.build.production.pug)
})


gulp.task('watch', () => {
    gulp.watch(paths.src.eslint, ['transpilar-test'])
    gulp.watch(paths.src.pug, ['pugCompiler-test'])
    gulp.start(['transpilar-test', 'pugCompiler-test'])
})

gulp.task('production', () => {
    gulp.watch(paths.src.eslint, ['transpiling'])
    gulp.watch(paths.src.pug, ['pugCompiler'])
    gulp.start(['transpiling', 'pugCompiler'])
})

gulp.task('default', ['watch'])