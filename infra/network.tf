# resource "aws_vpc" "prod" {
#   cidr_block       = "10.0.0.0/16"
#   instance_tenancy = "default"

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_subnet" "frontend_a" {
#   vpc_id            = aws_vpc.prod.id
#   cidr_block        = "10.0.1.0/24"
#   availability_zone = var.aws_availability_zone_a

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_subnet" "frontend_b" {
#   vpc_id            = aws_vpc.prod.id
#   cidr_block        = "10.0.2.0/24"
#   availability_zone = var.aws_availability_zone_b

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_internet_gateway" "prod" {
#   vpc_id = aws_vpc.prod.id

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_eip" "frontend_a" {
#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_eip" "frontend_b" {
#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_route_table" "prod" {
#   vpc_id = aws_vpc.prod.id

#   route {
#     cidr_block = "0.0.0.0/0"
#     gateway_id = aws_internet_gateway.prod.id
#   }

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_security_group" "frontend" {
#   name        = "frontend"
#   description = "frontend"
#   vpc_id      = aws_vpc.prod.id

#   tags = {
#     Name = "frontend"
#   }

#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "TCP"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "HTTP"
#   }

#   ingress {
#     from_port   = 443
#     to_port     = 443
#     protocol    = "TCP"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "HTTPS"
#   }

#   ingress {
#     from_port   = 22
#     to_port     = 22
#     protocol    = "TCP"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "SSH"
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "Allow All"
#   }
# }
