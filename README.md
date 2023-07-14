# nodeappec2
Counter on DynamoDB increment on visit

## Script for EC2 Instances
#!/bin/bash
# Update system packages
sudo yum update -y
# Install Node.js dependencies
sudo yum install -y gcc-c++ make
# Download and install Node.js
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo yum install -y nodejs
# Verify Node.js installation
node --version
npm --version
sudo yum install -y git
