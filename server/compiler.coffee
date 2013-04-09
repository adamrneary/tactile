fs = require 'fs'
child_process = require 'child_process'

coffeePath = "#{__dirname}/../node_modules/coffee-script/bin/coffee"

module.exports.compile = (cb) ->
  compileCoffeeSrc ->
    compileCoffeeTests ->
      compileCoffeeExamples ->
        switch glob.config.css
          when 'less'
            compileLess ->
              cb()
          when 'scss'
            if process.env.NODE_ENV is 'development'
              compileScss(cb)
            else
              cb()

compileCoffeeTests = (cb) ->
  testDest = "#{__dirname}/../examples/public/js/test.js"
  srcDir = "#{__dirname}/../test/unit/*_test.coffee"
  command1 = "#{coffeePath} -j #{testDest} -cb #{srcDir}"
  command2 = "#{coffeePath} -p -cb #{srcDir}"

  child_process.exec command1, (err,stdout,stderr) ->
    if stderr
      child_process.exec command2, (err,stdout,stderr) ->
        console.log 'coffee err: ',stderr
        cb()
    else
      cb()

compileCoffeeSrc = (cb) ->
  firstUrl = "#{__dirname}/../src/coffee/index.coffee "
  secondUrl = "#{__dirname}/../src/coffee/util/ "
  thirdUrl = "#{__dirname}/../src/coffee/models/ "
  fourthUrl = "#{__dirname}/../src/coffee/chart.coffee"
  srcDest = "#{__dirname}/../dist/#{glob.config.name}.js"
  srcDir = firstUrl + secondUrl + thirdUrl + fourthUrl
  command1 = "#{coffeePath} -j #{srcDest} -cb #{srcDir}"
  command2 = "#{coffeePath} -p -cb #{srcDir}"
  srcDocDir = "#{__dirname}/../src/coffee/"
  srcDocDir1 = "#{__dirname}/../src/coffee/models/"
  srcDocDir2 = "#{__dirname}/../src/coffee/util/"
  doccoPath = "#{__dirname}/../node_modules/docco/bin/docco"
  docsDir = "#{__dirname}/../examples/public/docs/"

  child_process.exec command1, (err,stdout,stderr) ->
    if stderr
      child_process.exec command2, (err,stdout,stderr) ->
        console.log 'coffee err: ',stderr
        cb()
    else
      # child_process.exec "#{doccoPath} #{srcDocDir}*.coffee -o #{docsDir}"
      # cb()
      child_process.exec "#{doccoPath} #{srcDocDir}*.coffee -o #{docsDir}"
      child_process.exec "#{doccoPath} #{srcDocDir1}*.coffee -o #{docsDir}"
      child_process.exec "#{doccoPath} #{srcDocDir2}*.coffee -o #{docsDir}"
      cb()

compileCoffeeExamples = (cb) ->
  destDir = "#{__dirname}/../examples/public/js/"
  srcDir = "#{__dirname}/../examples/public/coffee/"
  command1 = "#{coffeePath} -o #{destDir} -cb #{srcDir}"
  command2 = "#{coffeePath} -p -cb #{srcDir}"

  child_process.exec command1, (err,stdout,stderr) ->
    if stderr
      child_process.exec command2, (err,stdout,stderr) ->
        console.log 'coffee err: ',stderr
        cb()
    else
      cb()

compileScss = (cb) ->
  sass = require 'node-sass'
  fs.readFile "#{__dirname}/../src/scss/tactile.scss", (err, scssFile) ->
    sass.render scssFile.toString(), (err, css) ->
      if err
        console.log err
        cb()
      else
        console.log  'zapisujemy do: ' + "#{__dirname}/../dist/#{glob.config.name}.css"
        fs.writeFile "#{__dirname}/../dist/#{glob.config.name}.css", css, (err) ->
          if err
            console.log 'ERROR compiling scss: ' + err
          else
            cb()



    , { include_paths: [ "#{__dirname}/../src/scss/"] }

compileLess = (cb) ->
  lesscPath = "#{__dirname}/../node_modules/less/bin/lessc"
  lessDest = "#{__dirname}/../src/less/index.less"
  child_process.exec "#{lesscPath} #{lessDest}", (err,stdout,stderr) ->
    console.log 'less err: ',stderr if stderr
    fs.writeFile "#{__dirname}/../dist/#{name}.css", stdout, ->
      cb()

compileExamplesScss = (cb)->
  sass = require 'node-sass'
  fs.readFile "#{__dirname}/../examples/src/scss/examples.scss",
    (err, scssFile)->
      sass.render scssFile.toString(), (err, css)->
        if err
          console.log err
          cb()
        else
          fs.writeFile "#{__dirname}/../examples/public/css/examples.css",
            css, ->
              cb()
      , { include_paths: [ "#{__dirname}/../examples/src/scss/"] }
