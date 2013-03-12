require('coffee-script')
global.glob = {}
glob.config = require('../server/config')
compile = require('../server/compiler').compile

spawn = require('child_process').spawn
exec = require('child_process').exec

cover = function (cb) {
  //cmd = __dirname+'/../node_modules/jscoverage/bin/visionmedia-jscoverage '+__dirname+'/../dist/'+glob.config.name+'.js '+__dirname+'/cov/'+glob.config.name+'.js'
  cmd = __dirname+'/../node_modules/jscoverage/bin/jscoverage '+__dirname+'/../dist/'+glob.config.name+'.js '+__dirname+'/cov/'+glob.config.name+'.js'
  exec(cmd,function(err,stdout,stderr) {
    if (cb) cb()
  });
};

try {
    require('fs').mkdirSync(__dirname+'/reports')
} catch (e) {

}

start = function () {
  compile(function() {
    server()
    cover(function() {
      report()
      spec()
    });
  });
};

server_instance = {}
server = function () {
  process.env.NODE_ENV = 'development'
  if (server_instance.kill) {server_instance.kill()}
  server_instance = spawn('node',['server/run'], {env: process.env})
  server_instance.stdout.on('data',function(data) {
    process.stdout.write(data.toString())
  });
  server_instance.stderr.on('data',function(data) {
    process.stdout.write(data.toString())
  });
};

report = function (cb) {
  html = ''
  _env = {}
  for (var p in process.env) {
    _env[p] = process.env[p]
  }
  _env.REPORT = 1
  proc = spawn(__dirname+'/../node_modules/mocha/bin/mocha',[__dirname+'/run.js', '-R', 'html-cov', '-s', '20', '--timeout', '6000', '--globals', 'd3,window,_$jscoverage,_$jscoverage_cond,_$jscoverage_done,_$jscoverage_init,_,browser'], {env: _env})
  proc.stdout.on('data',function(data) {
      html += data.toString()
  });
  proc.on('exit', function(err,stdout,stderr) {
    console.log(err);
    require('fs').writeFile(__dirname+'/reports/coverage.html',html)
    if (cb) cb()
  });
};

var watched = false
var proc = null
var filesNames = require('fs').readdirSync(__dirname+'/../src/scss/');

  spec = function (cb) {
    for (var name in filesNames) {
    var path = __dirname+'/../src/scss/'+filesNames[name];
    if (!watched) {
      require('fs').watch(path,function(event,filename) {
        if (proc) {
          proc.kill()
        }
      });
    }
  }
  proc = spawn(__dirname+'/../node_modules/mocha/bin/mocha',[__dirname+'/run.js', '-Gw','-R','spec','-s','20','--timeout','6000','--globals','d3,window,_$jscoverage,_$jscoverage_cond,_$jscoverage_done,_$jscoverage_init,_,browser'], {stdio: 'inherit'})
  proc.on('exit',function() {
    start()
  });
};

start()
