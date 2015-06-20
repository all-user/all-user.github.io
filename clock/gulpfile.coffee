gulp       = require 'gulp'
source     = require 'vinyl-source-stream'
browserify = require 'browserify'
coffeeify  = require 'coffeeify'

gulp.task 'build', ->
  browserify
    entries:    ['./src/main.coffee']
    extensions: ['.coffee']
  .transform coffeeify
  .bundle()
  .pipe source 'main.js'
  .pipe gulp.dest './build'
