Vagrant.configure("2") do |config|
  config.vm.box = "generic/alma9"
  config.vm.box_version = "4.3.12"

  config.vm.define "openshift" do |vm|
    vm.vm.hostname = "openshift"
    vm.vm.network "private_network", ip: "192.168.56.10"

    vm.vm.provider "virtualbox" do |vb|
      vb.name = "openshift"
      vb.cpus = 8
      vb.memory = 32768

      # 2 storage lines to uncomment if you want to create a new disk
      vb.customize ["createhd", "--filename", File.join(Dir.pwd, "openshift.vdi"), "--size", 153600] 
      vb.customize ["storageattach", :id, "--storagectl", "SATA Controller", "--port", 1, "--device", 0, "--type", "hdd", "--medium", File.join(Dir.pwd, "openshift.vdi")]

    end
  vm.vm.provision "shell", path: "scripts/ansible_install.sh"
  end
end


# Notes: openshift min: 8 CPUs 32GB RAM and 150gb disk