//引入组件
var gulp=require('gulp'),
    less=require('gulp-less'),
    minicss=require('gulp-minify-css'),//压缩css
    tinypng=require('gulp-tinypng'),//使用tinypng插件压缩png和jpg图片
    notify=require('gulp-notify'),//编译错误时，显示通知，保证watch继续
    autoprefixer=require('gulp-autoprefixer'),//添加前缀css
    orig=require('gulp-rev-orig'),//自动在html中添加版本控制
    reload=require('gulp-livereload'),//保存刷新页面
    concat=require('gulp-concat'),//合并js
    uglify=require('gulp-uglify'),//压缩js代码
    plumber=require('gulp-plumber')//配合notify保证watch任务继续


gulp.task('html',function(){
    return gulp.src('./src/*.html')
        .pipe(orig({//版本号为watch完成时的时间
          revType: 'date',
          dateFormat: 'yymmddHHmm'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload())
})

gulp.task('js',function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))//合并后的名字
        .pipe(uglify())//压缩js
        .pipe(gulp.dest('./src/js'))
        .pipe(gulp.dest('./dist/js'))
})

//编译less
gulp.task('less',function(){
    //定义错误时notify通知的信息
    var onError=function(err){
        notify.onError({
            title:    "Gulp",
            subtitle: "Failure!",
            message:  "Error: <%= error.message %>",
            sound:    "Beep"
        })(err);
        this.emit('end');
    }
    return gulp.src('./src/css/*.less')
        //通过plumber将错误信息提交给notify显示出来
        .pipe(plumber({errorHandler: onError}))
        .pipe(less())
        .pipe(autoprefixer({
            browsers:['Android >=2.3','iOS 6','iOS 7','iOS 8','iOS 9'],//适配安卓2.3和ios6以上的版本
            remove:true
        }))
        .pipe(concat('all.css'))
        .pipe(minicss())    //压缩css
        .pipe(gulp.dest('./src/css'))
        .pipe(gulp.dest('./dist/css'))
        //成功后notify通知
        .pipe(notify({ // Add gulpif here
            title: 'Gulp',
            subtitle: 'success',
            message: 'successfully Compiled',
            sound: "Pop"
        }))
        .pipe(reload())
})

//使用tinypng对图片进行高压缩
gulp.task('img',function(){
    return gulp.src('./src/img/*.{png,jpg,gif,icon}')
        .pipe(tinypng('53LWY9FK4uVlB3rFJ7lx2X6jh4NhT62L'))//tinypng插件的密钥
        .pipe(gulp.dest('./dist/img'))
        .pipe(reload())
})

//监听事件
gulp.task('watch',function(){
    reload.listen()
    gulp.watch('./src/*.html',function(){
        gulp.run('html')
    })
    gulp.watch('./src/js/*.js',function(){
        gulp.run('js')
    })
    gulp.watch('./src/css/*.less',function(){
        gulp.run('less')
    })
    gulp.watch('./src/img/*.{png,jpg,gif,icon}',function(){
        gulp.run('img')
    })
})
