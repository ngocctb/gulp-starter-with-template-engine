/*
 AUTHOR : CHAU TRUNG BAO NGOC
 Skype : ngoc.ctb1
 MAIL : chautrungbaongoc@gmail.com
 TEL : (+84)903.862.068
---------------------------------
GLOBAL
---------------------------------
*/
var base_dir            = "app";
var project_name        = "project_name";

/*--- Development ---*/
var folder_development  = base_dir + "/development/" + project_name,
    folder_sass         = folder_development + '/sass/**/*.scss',
    folder_less         = folder_development + '/less/**/*.less',
    folder_dev_images   = folder_development + '/images/**/*.+(png|jpg|jpeg|gif|svg)',
    folder_dev_js       = folder_development + '/js',
    folder_dev_js_script= folder_dev_js      + '/scripts/**/*.js',
    folder_dev_js_app   = folder_dev_js      + '/app/**/*.ts',
    folder_dev_fonts    = folder_development + '/fonts/**/*',
    folder_dev_html     = folder_development + '/view/**/*.+(jade|pug)';

/*--- Public ---*/
var folder_public       = base_dir + "/public/" + project_name,
    folder_css          = folder_public + '/css',
    folder_js           = folder_public + '/js',
    folder_js_app       = folder_js + '/app',
    folder_images       = folder_public + '/images',
    folder_fonts        = folder_public + '/fonts',
    folder_html         = folder_public + '/**/*.+(html|php)';

/*
---------------------------------
Setting NPM Gulp
---------------------------------
*/

var gulp = require('gulp'),
    phpConnect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    cssnano = require('gulp-cssnano'),
    notify  = require('gulp-notify'),
    rename = require('gulp-rename'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gulpPug = require('gulp-pug'),  // jade version 2
    concat  = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    data = require('gulp-data'),
    del = require('del'),
    gulpif = require('gulp-if'),
    typescript = require('gulp-typescript'),
    tsProject = typescript.createProject("tsconfig.json"),
    cache = require('gulp-cache')
;

var port = 8888,
    proxy = '127.0.0.1'+ ':' + port,
    typeHTMLCombiner = 'pug',
    typeCssCombiner = 'less',
    pathCssCombiner = folder_development + '/'+ typeCssCombiner +'/**/*.' + typeCssCombiner;

/*
---------------------------------
Development Tasks 
---------------------------------
*/

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        port: port, // ip server apache
        //    https: true,
        notify: false,
        // proxy: proxy,
        server: {
            baseDir: folder_public,
            // directory: false,
            index: 'index.html'
        }
    }); // message;
});

// Start browserSync server using extension php
gulp.task('phpConnect', function() {
    phpConnect.server({
        base: 'build',
        port: port,
        keepalive: true
    });
});
gulp.task('browserSyncPHP', ['phpConnect'], function() {
    browserSync({
        baseDir: folder_public,
        proxy: proxy, // ip server apache
        port: port, // default apache port for http connections
        open: true,
        notify: true //
    }); // message;
});

// Sass Task Settings
gulp.task('sass', function() {
    return gulp.src( folder_sass ) // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass({
            'executeOption': {
                maxBuffer: 10000*1024
            },
            outputStyle: 'compressed'// nested, compact, expanded, compressed
            // https://web-design-weekly.com/2014/06/15/different-sass-output-styles/
        })) // Passes it through a gulp-sass
        .pipe(gulp.dest( folder_css )) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(cssnano())
        .pipe(notify('SASS task finished'));
});

// Less Task Settings
gulp.task('less', function () {
    return gulp.src([
            folder_less,
            '!' + folder_development + '/less/includes/**/*.less', // until folder
        ])
        .pipe(less({
            paths: [ path.join( folder_less ) ],  // Specify search paths for @import directives
            filename: 'style.less', // Specify a filename, for better error messages
            compress: true          // Minify CSS output
        }))
        // .pipe(concat('style.css')) // union all file combine only file style.css
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }))
        .pipe(gulp.dest( folder_css ))
        .pipe(notify('Less task finished')); // message;
});

// Javascript Task Settings
gulp.task('js', function() {
    return gulp.src([
            folder_dev_js_script
        ])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('main.js')) //file join
        .pipe(uglify({ //minfy
            preserveComments: 'some' // comment options
        }))
        .pipe(rename({
            suffix: ''
        }))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }))
        .pipe(gulp.dest( folder_js )) // file dir
        .pipe(notify('Javascript task finished')); // message
});

gulp.task('jscopy', function() {
    return gulp.src([
            folder_dev_js + '/libs/**/*.js'
        ])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(uglify({ //minfy
            preserveComments: 'some' // comment options
        }))
        .pipe(rename({
            suffix: ''
        }))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }))
        .pipe(gulp.dest( folder_js + '/libs' )) // file dir
        .pipe(notify('Javascript Copy task finished')); // message
});

// Javascript Application Task Settings
gulp.task('app', function() {
    return tsProject.src([
            folder_dev_js_app,
        ])
        .pipe(tsProject()).js
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('app.js')) //file join
        .pipe(uglify({ //minfy
            preserveComments: 'some' // comment options
        }))
        .pipe(rename({
            suffix: ''
        }))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }))
        .pipe(gulp.dest( folder_js_app )) // file dir
        .pipe(notify('Javascript Application task finished')); // message
});

//Jade template Taks Settings
gulp.task('pug', function () {
    return gulp.src([
            folder_dev_html,
            '!' + folder_development + '/view/+(includes|layout|mixin)/**/*.+(jade|pug)'
        ])
        .pipe( gulpPug({
            pretty: true // min file default false
        }))
        .pipe( browserSync.reload({
            stream:true
        }))
        .pipe(gulp.dest( folder_public ))
        .pipe(notify('Pug task finished'));
});

// Optimizing Images
gulp.task('images', function() {
    return gulp.src( folder_dev_images )
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            // interlaced: true,
            progressive: true,
            svgoPlugins: [
                { removeViewBox: false },
                { cleanupIDs: false }
            ],
            use: [pngquant()]
        })))
        .pipe( gulp.dest( folder_images ))
        .pipe( notify('Optimizing Images task finished') );
});

// Copying fonts
gulp.task('fonts', function() {
    return gulp.src( folder_dev_fonts )
        .pipe(gulp.dest( folder_fonts ))
        .pipe( notify('Copying fonts task finished') );
});

// Cleaning
gulp.task('clean', function(cb) {
    del([
        folder_public + '/**/*'
    ], {dryRun: true}).then( paths => {
            console.log('Files and folders that would be deleted:\n', paths.join('\n'));
    });
});

// Watchers
gulp.task('watch', function() {

    //run task
    gulp.watch( folder_dev_html , [ typeHTMLCombiner ] );

    //run style
    gulp.watch( pathCssCombiner, [ typeCssCombiner ] );

    //run javascript
    gulp.watch( folder_dev_js, ['js', 'jscopy'] );
    gulp.watch( folder_dev_js_app , ['app'] );

    //run images
    gulp.watch( folder_dev_images, ['images'] );

    //browser sysn
    gulp.watch( folder_dev_html, browserSync.reload );

});

//defaut task
gulp.task('default', function(callback) {
    runSequence([
            'watch', 'browserSync', typeHTMLCombiner, typeCssCombiner,
            'js', 'jscopy', 'app', 'images', 'fonts'
        ],
        callback
    )
});
