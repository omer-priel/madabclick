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

resource "tls_private_key" "fontend" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "fontend" {
  key_name   = "fontend_key_pair"
  public_key = tls_private_key.fontend.public_key_openssh
}

resource "aws_imagebuilder_image_recipe" "frontend" {
  name              = "frontend"
  parent_image      = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:image/amazon-linux-2-x86/x.x.x"
  version           = "1.0.0"
  working_directory = "/tmp"

  tags = {
    Name = "frontend"
  }

  block_device_mapping {
    device_name = "/dev/xvdb"

    ebs {
      delete_on_termination = true
      volume_size           = 8
      volume_type           = "gp2"
    }
  }

  component {
    component_arn = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:component/amazon-cloudwatch-agent-linux/x.x.x"
  }

  component {
    component_arn = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:component/update-linux/x.x.x"
  }

  component {
    component_arn = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:component/simple-boot-test-linux/x.x.x"
  }
}

data "aws_iam_policy_document" "prod_ec2_image_builder_role_policy_ec2" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "prod_ec2_image_builder_role_policy_s3" {
  statement {
    actions = [
      "s3:*",
      "s3-object-lambda:*"
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_iam_role" "prod_ec2_image_builder_role" {
  name               = "prod_ec2_image_builder_role"
  description        = "prod_ec2_image_builder_role"
  assume_role_policy = data.aws_iam_policy_document.prod_ec2_image_builder_role_policy_ec2.json

  inline_policy {
    policy = data.aws_iam_policy_document.prod_ec2_image_builder_role_policy_s3.json
  }

  tags = {
    "Name" : "production"
  }
}

resource "aws_iam_instance_profile" "prod_ec2_image_builder" {
  name = "prod_ec2_image_builder"
  role = aws_iam_role.prod_ec2_image_builder_role.name

  tags = {
    "Name" : "production"
  }
}

resource "aws_s3_bucket" "frontend_logs" {
  tags = {
    Name = "frontend_logs"
  }
}

resource "aws_imagebuilder_infrastructure_configuration" "frontend" {
  name                          = "frontend"
  description                   = "frontend"
  instance_profile_name         = aws_iam_instance_profile.prod_ec2_image_builder.name
  instance_types                = ["t2.nano"]
  key_pair                      = aws_key_pair.fontend.key_name
  security_group_ids            = [aws_security_group.frontend.id]
  subnet_id                     = aws_subnet.prod.id
  terminate_instance_on_failure = true

  tags = {
    Name = "frontend"
  }

  logging {
    s3_logs {
      s3_bucket_name = aws_s3_bucket.frontend_logs.bucket
      s3_key_prefix  = "logs"
    }
  }
}

resource "aws_imagebuilder_distribution_configuration" "frontend" {
  name        = "frontend"
  description = "frontend"

  tags = {
    Name = "frontend"
  }

  distribution {
    region = var.aws_region

    ami_distribution_configuration {
      name        = "frontend-{{ imagebuilder:buildDate }}"
      description = "frontend"

      ami_tags = {
        Name = "frontend"
      }
    }
  }
}

resource "aws_imagebuilder_image_pipeline" "frontend" {
  name                             = "frontend"
  description                      = "frontend"
  image_recipe_arn                 = aws_imagebuilder_image_recipe.frontend.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.frontend.arn
  distribution_configuration_arn   = aws_imagebuilder_distribution_configuration.frontend.arn

  tags = {
    Name = "frontend"
  }
}

# resource "aws_instance" "frontend" {
#   ami               = aws_imagebuilder_image_pipeline.frontend.ami
#   instance_type     = "t2.nano"
#   availability_zone = var.aws_availability_zone

#   tags = {
#     Name = "frontend"
#   }

#   network_interface {
#     device_index         = 0
#     network_interface_id = aws_network_interface.frontend.id
#   }

#   user_data = <<-EOL
#   #!/bin/bash
#   apt update -y >> /var/my-install-log.txt
#   apt install apache2 -y >> /var/my-install-log.txt
#   mkdir -p /var/www/html >> /var/my-install-log.txt
#   echo Hello World > /var/www/html/index.html
#   systemctl start apache2 >> /var/my-install-log.txt
#   EOL
# }

output "frontend_public_ip" {
  value = aws_eip.frontend.public_ip
}
