Vagrant.configure("2") do |config|
  config.vm.box = "generic/alma9"
  config.vm.box_version = "4.3.12"

  config.vm.define "openshift" do |vm|
    vm.vm.hostname = "openshift"
    vm.vm.network "private_network", ip: "192.168.56.10"
    vm.vm.synced_folder ".", "/vagrant", disabled: true

    vm.vm.provider "virtualbox" do |vb|
      vb.name   = "openshift"
      vb.cpus   = 8
      vb.memory = 32768
      vb.gui    = false
    end

    vm.vm.provision "shell", path: "scripts/ansible_install.sh"
  end

  if Vagrant.has_plugin?("vagrant-disksize")
    config.disksize.size = "150GB"
  end
end
