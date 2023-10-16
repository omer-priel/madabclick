terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
}

provider "aws" {
  region = "us-east-1"

  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

provider "tls" {
  proxy {
    url = "https://corporate.proxy.service"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}

resource "aws_instance" "frontend" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags = {
    Name = "Frontend"
  }

  key_name        = aws_key_pair.fontend.key_name
  security_groups = [aws_security_group.frontend.name]

  user_data = <<-EOF
              #!/bin/bash
              sudo api update -y
              sudo api install apache2
              sudu systemctl start apache2
              bash -c 'echp EC2 working with apache2 > /var/www/html/index.html'
              EOF
}

resource "aws_eip" "eip" {
  instance = aws_instance.frontend.id
  tags = {
    Name = "Frontend"
  }
}

output "frontend_public_ip" {
  value = aws_eip.eip.public_ip
}

resource "aws_security_group" "frontend" {
  name        = "frontend"
  description = "Frontend security group"

  ingress {
    from_port   = 80 # HTTP
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443 ## HTTPS
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22 # SSH
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "tls_private_key" "fontend" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "fontend" {
  key_name   = "fontend_key_pair"
  public_key = tls_private_key.fontend.public_key_openssh
}
