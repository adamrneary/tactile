app = require('showcase').app(__dirname)
kss = require('kss')

{isAuth, docco, getSections} = require('showcase')

app.configure 'development', ->
  require('brunch').watch({})

app.configure 'production', ->
  app.set('github-client-id', 'dc66e7c410bccfebe856')
  app.set('github-client-secret', '3a723d02515f8224693457739262b74a0688d5df')

app.get '/', isAuth, (req, res) ->
  res.render 'examples/index'

app.get '/tests', isAuth, (req, res) ->
  res.render 'examples/iframe', url: '/test_runner.html'

app.get '/documentation', isAuth, (req, res) ->
  res.render 'examples/iframe', url: '/docs/chart.html'

app.get '/styleguide', isAuth, (req, res) ->
  kss.traverse "#{__dirname}/src/scss", { markdown: false }, (err, styleguide) ->
    return res.send(500, err) if err
    res.render 'examples/styleguide',
      sections: getSections('tactile.scss', "#{__dirname}/views/sections", styleguide)

app.start()

# Generate docco documenation
docco(files: '/src/coffee/**/*.coffee', output: '/public/docs', root: __dirname, layout: 'linear')
