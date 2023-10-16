resource "aws_vpc" "prod" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "production"
  }
}

resource "aws_internet_gateway" "prod" {
  vpc_id = aws_vpc.prod.id

  tags = {
    Name = "production"
  }
}


resource "aws_route_table" "prod" {
  vpc_id = aws_vpc.prod.id

  tags = {
    Name = "production"
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.prod.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.prod.id
  }
}

resource "aws_subnet" "prod" {
  vpc_id            = aws_vpc.prod.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.aws_availability_zone

  tags = {
    Name = "production"
  }
}

resource "aws_route_table_association" "prod" {
  route_table_id = aws_route_table.prod.id
  subnet_id      = aws_subnet.prod.id
}

resource "aws_security_group" "frontend" {
  name        = "security_group_frontend"
  description = "frontend security group"
  vpc_id      = aws_vpc.prod.id

  tags = {
    Name = "frontend"
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_network_interface" "frontend" {
  subnet_id       = aws_subnet.prod.id
  private_ips     = ["10.0.1.50"]
  security_groups = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }
}

resource "aws_eip" "frontend" {
  vpc                       = true
  network_interface         = aws_network_interface.frontend.id
  associate_with_private_ip = "10.0.1.50"
  depends_on                = [aws_internet_gateway.prod]

  tags = {
    Name = "frontend"
  }
}

data "aws_ami" "frontend" {
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

resource "tls_private_key" "fontend" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "fontend" {
  key_name   = "fontend_key_pair"
  public_key = tls_private_key.fontend.public_key_openssh
}

resource "aws_instance" "frontend" {
  ami               = data.aws_ami.frontend.id
  instance_type     = "t2.micro"
  availability_zone = var.aws_availability_zone
  key_name          = aws_key_pair.fontend.key_name

  tags = {
    Name = "frontend"
  }

  network_interface {
    device_index         = 0
    network_interface_id = aws_network_interface.frontend.id
  }

  user_data = <<-EOL
  #!/bin/bash
  apt update -y >> /var/my-install-log.txt
  apt install apache2 -y >> /var/my-install-log.txt
  mkdir -p /var/www/html >> /var/my-install-log.txt
  echo Hello World > /var/www/html/index.html
  systemctl start apache2 >> /var/my-install-log.txt
  EOL
}

output "frontend_public_ip" {
  value = aws_eip.frontend.public_ip
}
