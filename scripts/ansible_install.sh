#!/usr/bin/env bash
set -euo pipefail

# elevate if not root
if [ "$(id -u)" -ne 0 ]; then
  exec sudo -E bash "$0" "$@"
fi

dnf -y install dnf-plugins-core || true
dnf config-manager --set-enabled crb || true
dnf -y install epel-release
dnf -y update
dnf -y install ansible

ansible --version
