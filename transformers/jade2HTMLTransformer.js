
import gulp from "gulp";
import gulpPug from 'gulp-pug';
import  plumber from 'gulp-plumber';

class Jade2HTMLTransformer {

    /**
     * @param  {any} options={}
     */
    constructor(options = {}) {
        this._options = options;
    }

    /**
     * @param  {[string|string[]]} src
     * @param  {[string|string[]]} dest
     */
    transform(src, dest) {
        return gulp
            .src(src)
            .pipe(plumber())
            .pipe(gulpPug(this._options))
            .pipe(gulp.dest(dest));
    };
}

module.exports.Jade2HTMLTransformer = Jade2HTMLTransformer;