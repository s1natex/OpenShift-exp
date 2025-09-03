#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

ansible-galaxy collection install -r requirements.yml
ansible-playbook -i inventory.ini playbooks/readiness.yml
