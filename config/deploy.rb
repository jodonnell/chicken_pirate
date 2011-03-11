set :application, "chicken_pirate"
set :repository,  "https://jodonnell@github.com/jodonnell/chicken_pirate.git"
set :deploy_to, "/home/jodonnell/chicken_pirate/"
set :user, "jodonnell"
set :scm_user, "jodonnell"
set :branch, "master"
set :deploy_via, :remote_cache
default_run_options[:pty] = true

set :scm, :git
server "jacobodonnell.com", :app, :web, :db, :primary => true

namespace :deploy do
  task :start do
  end

  task :stop do
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end
