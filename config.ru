use Rack::Static, 
  :urls => ["/javascript","/css"],
  :root => "examples"

use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'turkeyLeg01']
end

# http://stackoverflow.com/questions/3863781/ruby-rack-mounting-a-simple-web-server-that-reads-index-html-as-default
# This is the root of our app
@root = File.expand_path(File.dirname(__FILE__))

run Proc.new { |env|
  # Extract the requested path from the request
  path = Rack::Utils.unescape(env['PATH_INFO'])
  index_file = @root + "#{path}/index.html"

  if File.exists?(index_file)
    # Return the index
    [200, {'Content-Type' => 'text/html'}, File.read(index_file)]
  else
    # Pass the request to the directory app
    Rack::Directory.new(@root).call(env)
  end
}