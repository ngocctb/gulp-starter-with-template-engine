Gulp Starter for project by CHAU TRUNG BAO NGOC  
This repo is a gulp starter for this project. 

### npm Install ###
Remember to do run the `npm install` command after cloning this repo :) 

### Gulp Install ###
Install a gulp to global.

**Note : Please input pc admin password.
```
-g : install system
-save : save system
--save-dev : save it package.json
***************************
example :
npm install gulp-git -g // global
npm install --save-dev gulp-git // for dev
```

npm Jade
```
"gulp-jade": "^1.1.0",
"gulp-jade-php": "^2.0.0-0",
```

Code git Bellow.
docs : https://www.npmjs.com/package/gulp-git
```
/*--- Git ---*/

var git_clone_url         = 'https://github.com/ngocctb/gulp-starter-with-template-engine.git',
    git_clone_sub_url     = "", // url clone sub
    git_folder_clone_sub  = "",
    git_version           = 'v1.1.1',
    git_newBranch         = "",
    git_branchName        = "",
    git_remove            = './node_modules/**',// the file remove
    git_commit_message    = 'change struct folder and add lib jade php, php connect';
    
/*
-- Open the terminal run :
1. gulp git:init
2. gulp git:remote 
3. gulp git:add     
4. gulp git:commit 
5. gulp git:push 
*/

    gulp.task('git:init', function(){
     git.init({args: '--quiet --bare'}, function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:remote', function(){
      git.addRemote('origin', git_clone_url );
    });
    
    gulp.task('git:add', function(){
      return gulp.src( [ '!./node_modules/**','./app/**', 'gulpfile.js', 'package.json', 'README.md' ]  )
      .pipe(git.add())
      .pipe(notify('git add data finished'));
    });
    
    gulp.task('git:push', function(){
     git.push('origin', ['master'], {args: " -f"}, function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:pull', function(){
      git.pull('origin', ['master'], function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:fetch', function(){
      git.fetch('origin', '', function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:clone', function(){
      git.clone( git_clone_url , function (err) {
        if (err) throw err;
      });
    });
    
    /*
    gulp.task('git:branch', function(){
      git.branch( git_newBranch , function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:checkout', function(){
      git.checkout( git_branchName , function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:merge', function(){
      git.merge( git_branchName, function (err) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:addSubmodule', function(){
      git.addSubmodule( git_clone_sub_url , 'git-add-sub-module', { args: '-b master'});
    });
    
    gulp.task('git:updateSubmodules', function(){
      git.updateSubmodule({ args: '--init' });
    });
    
    gulp.task('git:status', function(){
      git.status({args: '--porcelain'}, function (err, stdout) {
        if (err) throw err;
      });
    });
    
    gulp.task('git:log', function(){
      git.exec({args : 'log --follow index.js'}, function (err, stdout) {
        if (err) throw err;
      });
    });
    
    */
```

### Install permiss denied ###
```
sudo chmod -R 777 /usr/local/lib/node_modules/jade
```


Haahhaa ! enjoy ! :D
