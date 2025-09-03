#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  exec sudo -E bash "$0" "$@"
fi

dnf -y install dnf-plugins-core || true
dnf config-manager --set-enabled crb || true
dnf -y install epel-release
dnf -y update
dnf -y install ansible git python3 python3-pip curl bind-utils net-tools

ansible --version
