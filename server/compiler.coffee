fs = require 'fs'
child_process = require 'child_process'
sass = require 'node-sass'

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
          compileScss ->
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
  srcDest = "#{__dirname}/../dist/#{glob.config.name}.js"
  srcDir = "#{__dirname}/../src/coffee/index.coffee #{__dirname}/../src/coffee/util/ #{__dirname}/../src/coffee/models/ #{__dirname}/../src/coffee/chart.coffee"
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
  fs.readFile "#{__dirname}/../src/scss/tactile.scss", (err, scssFile) ->
    sass.render scssFile.toString(), (err, css) ->
      if err
        console.log err
        cb()
      else
        fs.writeFile "#{__dirname}/../dist/#{glob.config.name}.css", css, ->
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
    fs.readFile "#{__dirname}/../examples/src/scss/examples.scss", (err, scssFile)->
        sass.render scssFile.toString(), (err, css)->
            if err
                console.log err
                cb()
            else
                fs.writeFile "#{__dirname}/../examples/public/css/examples.css", css, ->
                    cb()
        , { include_paths: [ "#{__dirname}/../examples/src/scss/"] }

#compileLess = (cb)->
    #child_process.exec "#{__dirname}/../node_modules/less/bin/lessc #{__dirname}/../src/less/index.less", (err,stdout,stderr)->
        #console.log 'less err: ',stderr if stderr
        #fs.writeFile "#{__dirname}/../dist/#{name}.css", stdout, ->
            #cb()
