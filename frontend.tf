data "aws_ami" "frontend_ubuntu_ami" {
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
  ami           = data.aws_ami.frontend_ubuntu_ami.id
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

resource "aws_eip" "frontend" {
  instance = aws_instance.frontend.id
  tags = {
    Name = "Frontend"
  }
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

output "frontend_public_ip" {
  value = aws_eip.frontend.public_ip
}
