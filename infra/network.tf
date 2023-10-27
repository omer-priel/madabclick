# resource "aws_vpc" "prod" {
#   cidr_block       = "10.0.0.0/16"
#   instance_tenancy = "default"

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_internet_gateway" "prod" {
#   vpc_id = aws_vpc.prod.id

#   tags = {
#     Name = "production"
#   }
# }


# resource "aws_route_table" "prod" {
#   vpc_id = aws_vpc.prod.id

#   tags = {
#     Name = "production"
#   }

#   route {
#     cidr_block = "0.0.0.0/0"
#     gateway_id = aws_internet_gateway.prod.id
#   }

#   route {
#     ipv6_cidr_block = "::/0"
#     gateway_id      = aws_internet_gateway.prod.id
#   }
# }

# resource "aws_subnet" "prod_1" {
#   vpc_id            = aws_vpc.prod.id
#   cidr_block        = "10.0.1.0/24"
#   availability_zone = var.aws_availability_zone_1

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_subnet" "prod_2" {
#   vpc_id            = aws_vpc.prod.id
#   cidr_block        = "10.0.2.0/24"
#   availability_zone = var.aws_availability_zone_2

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_route_table_association" "prod_1" {
#   route_table_id = aws_route_table.prod.id
#   subnet_id      = aws_subnet.prod_1.id
# }

# resource "aws_route_table_association" "prod_2" {
#   route_table_id = aws_route_table.prod.id
#   subnet_id      = aws_subnet.prod_2.id
# }

# resource "aws_security_group" "frontend" {
#   name        = "security_group_frontend"
#   description = "frontend security group"
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

#   ingress {
#     description = "HTTPS"
#     from_port   = 443
#     to_port     = 443
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
