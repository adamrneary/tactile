name = glob.config.name
app = glob.app
modules = glob.modules

app.get '/pid', (req,res)->
  if req.query.secret is glob.config.secret
    res.send
      pid: process.pid
  else
    res.send 401

app.get '/', (req,res)->
  res.render 'index'
    page: 'index'

app.get '/documentation', (req,res)->
  docs = {}
  docsPath = "#{__dirname}/../examples/public/docs/"
  docFiles = modules.fs.readdirSync docsPath
  for docFile in docFiles
    if docFile.substr(docFile.length-4) == 'html'
      htmlBody = modules.fs.readFileSync docsPath + docFile, 'utf-8'
      jsReg = /<body>([\s\S]*?)<\/body>/gi
      container = jsReg.exec(htmlBody)
      docs[docFile] = container[1]

  res.render 'documentation'
    docs: docs
    page: 'documentation'

app.get '/coverage', (req,res)->
  cover = ''
  coverPath = "#{__dirname}/../test/reports/coverage.html"
  htmlBody = modules.fs.readFileSync coverPath, 'utf-8'
  if htmlBody.length > 0
    cover = htmlBody.substr(htmlBody.indexOf("<body>")+6, htmlBody.length - 14)
  res.render 'coverage'
    cover: cover
    page: 'coverage'

  #report = ''
  #try
    #destDir = __dirname+'/../test/reports/coverage.html'
    #report = glob.modules.fs.readFileSync destDir
  #res.setHeader 'Content-Type', 'text/html'
  #res.setHeader 'Content-Length', report.length
  #res.end report


app.get '/test', (req,res)->
  errors = {}
  pathes = [
    "#{__dirname}/../src/coffee/",
    "#{__dirname}/../src/coffee/models/",
    "#{__dirname}/../src/coffee/util/",
    "#{__dirname}/../examples/public/coffee/",
    "#{__dirname}/../server/",
    "#{__dirname}/../test/",
    "#{__dirname}/../test/client/",
    "#{__dirname}/../test/integration/",
    "#{__dirname}/../test/server/",
    "#{__dirname}/../test/unit/"
  ]

  for path in pathes
    files = modules.fs.readdirSync path
    for f in files
      if f.substr(-7) is ".coffee"
        contents = modules.fs.readFileSync path + f, 'utf-8'
        errors[path + f] = modules.coffeelint.lint contents

  #try
    #lint = glob.modules.fs.readFileSync __dirname+'/../test/reports/lint.txt'

  res.render 'test'
    errors: errors
    page: 'mocha'

app.get '/styleguide', (req,res)->
  options =
    markdown: false
  modules.kss.traverse "#{__dirname}/../src/", options, (err, styleguide)->
    glob.getSections styleguide.section(), (sections)->
      res.render 'styleguide'
        sections: sections
        page: 'styleguide'

app.get "/js/#{name}.js", (req,res)->
  script = modules.fs.readFileSync "#{__dirname}/../dist/#{name}.js"
  res.setHeader 'Content-Type', 'text/javascript'
  res.setHeader 'Content-Length', script.length
  res.end script

app.get "/css/#{name}.css", (req,res)->
  style = modules.fs.readFileSync "#{__dirname}/../dist/#{name}.css"
  res.setHeader 'Content-Type', 'text/css'
  res.setHeader 'Content-Length', style.length
  res.end style

