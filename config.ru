use Rack::Static, 
  :urls => ["/css", "/javascript","/img"],
  :root => "examples"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('examples/index.html', File::RDONLY)
  ]
}