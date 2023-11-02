resource "aws_vpc" "prod" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "production"
  }
}

# resource "aws_subnet" "frontend_private_a" {
#   vpc_id            = aws_vpc.prod.id
#   cidr_block        = "10.0.1.0/24"
#   availability_zone = var.aws_availability_zone_a

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_subnet" "frontend_private_b" {
#   vpc_id            = aws_vpc.prod.id
#   cidr_block        = "10.0.2.0/24"
#   availability_zone = var.aws_availability_zone_b

#   tags = {
#     Name = "frontend"
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
#     description = "HTTP"
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   # ingress {
#   #   description = "HTTPS"
#   #   from_port   = 443
#   #   to_port     = 443
#   #   protocol    = "tcp"
#   #   cidr_blocks = ["0.0.0.0/0"]
#   # }

#   ingress {
#     description = "SSH"
#     from_port   = 22
#     to_port     = 22
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port        = 0
#     to_port          = 0
#     protocol         = "-1"
#     cidr_blocks      = ["0.0.0.0/0"]
#     ipv6_cidr_blocks = ["::/0"]
#   }
# }
