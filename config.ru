use Rack::Static, 
  :urls => ["/css", "/javascript","/img"],
  :root => "examples"

map "/" do
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
end

map "/styleguide" do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('examples/styleguide.html', File::RDONLY)
    ]
  }
end

map "/jasmine" do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('examples/jasmine_spec.html', File::RDONLY)
    ]
  }
end