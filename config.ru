use Rack::Static, 
  :urls => ["/javascript","/css"],
  :root => "examples"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('examples/simple-test.html', File::RDONLY)
  ]
}