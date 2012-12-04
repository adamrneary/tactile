use Rack::Static, 
  :urls => ["/javascript","/css"],
  :root => "examples"

use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'turkeyLeg01']
end

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