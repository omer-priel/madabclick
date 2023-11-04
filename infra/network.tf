resource "aws_vpc" "prod" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "production"
  }
}

resource "aws_eip" "frontend_a" {
  tags = {
    Name = "frontend"
  }
}

resource "aws_eip" "frontend_b" {
  tags = {
    Name = "frontend"
  }
}

resource "aws_internet_gateway" "prod" {
  vpc_id = aws_vpc.prod.id

  tags = {
    Name = "production"
  }
}

resource "aws_subnet" "frontend_a" {
  vpc_id            = aws_vpc.prod.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.aws_availability_zone_a

  tags = {
    Name = "frontend"
  }
}

resource "aws_subnet" "frontend_b" {
  vpc_id            = aws_vpc.prod.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = var.aws_availability_zone_b

  tags = {
    Name = "frontend"
  }
}

resource "aws_route_table" "prod" {
  vpc_id = aws_vpc.prod.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.prod.id
  }

  tags = {
    Name = "production"
  }
}

resource "aws_route_table_association" "prod_frontend_a" {
  subnet_id      = aws_subnet.frontend_a.id
  route_table_id = aws_route_table.prod.id
}

resource "aws_route_table_association" "prod_frontend_b" {
  subnet_id      = aws_subnet.frontend_b.id
  route_table_id = aws_route_table.prod.id
}

resource "aws_security_group" "frontend" {
  name        = "frontend"
  description = "frontend"
  vpc_id      = aws_vpc.prod.id

  tags = {
    Name = "frontend"
  }

  ingress {
    from_port   = 68
    to_port     = 68
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "DHCP"
  }

  ingress {
    from_port   = 323
    to_port     = 323
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Unknown reason"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "All traffic"
  }
}
