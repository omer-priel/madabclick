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

resource "aws_subnet" "prod_1" {
  vpc_id            = aws_vpc.prod.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.aws_availability_zone_1

  tags = {
    Name = "production"
  }
}

resource "aws_subnet" "prod_2" {
  vpc_id            = aws_vpc.prod.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = var.aws_availability_zone_2

  tags = {
    Name = "production"
  }
}

resource "aws_route_table_association" "prod_1" {
  route_table_id = aws_route_table.prod.id
  subnet_id      = aws_subnet.prod_1.id
}

resource "aws_route_table_association" "prod_2" {
  route_table_id = aws_route_table.prod.id
  subnet_id      = aws_subnet.prod_2.id
}

resource "aws_security_group" "frontend" {
  name        = "security_group_frontend"
  description = "frontend security group"
  vpc_id      = aws_vpc.prod.id

  tags = {
    Name = "frontend"
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

resource "aws_network_interface" "frontend_1" {
  subnet_id       = aws_subnet.prod_1.id
  private_ips     = ["10.0.1.50"]
  security_groups = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }
}

resource "aws_network_interface" "frontend_2" {
  subnet_id       = aws_subnet.prod_2.id
  private_ips     = ["10.0.2.50"]
  security_groups = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }
}

resource "aws_eip" "frontend_1" {
  vpc                       = true
  network_interface         = aws_network_interface.frontend_1.id
  associate_with_private_ip = "10.0.1.50"
  depends_on                = [aws_internet_gateway.prod]

  tags = {
    Name = "frontend"
  }
}

resource "aws_eip" "frontend_2" {
  vpc                       = true
  network_interface         = aws_network_interface.frontend_2.id
  associate_with_private_ip = "10.0.2.50"
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

  tags = {
    Name = "frontend"
  }
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

data "aws_iam_policy_document" "prod_image_builder_policy_ec2" {
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

data "aws_iam_policy_document" "prod_image_builder_policy_s3" {
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

resource "aws_iam_role" "prod_image_builder" {
  name               = "prod_image_builder"
  description        = "prod_image_builder"
  assume_role_policy = data.aws_iam_policy_document.prod_image_builder_policy_ec2.json

  inline_policy {
    policy = data.aws_iam_policy_document.prod_image_builder_policy_s3.json
  }

  tags = {
    "Name" : "production"
  }
}

resource "aws_iam_instance_profile" "prod_image_builder" {
  name = "prod_image_builder"
  role = aws_iam_role.prod_image_builder.name

  tags = {
    "Name" : "production"
  }
}

resource "aws_s3_bucket" "frontend_logs" {
  tags = {
    Name = "frontend"
  }
}

resource "aws_imagebuilder_infrastructure_configuration" "frontend" {
  name                          = "frontend"
  description                   = "frontend"
  instance_profile_name         = aws_iam_instance_profile.prod_image_builder.name
  instance_types                = ["t2.nano"]
  key_pair                      = aws_key_pair.fontend.key_name
  security_group_ids            = [aws_security_group.frontend.id]
  subnet_id                     = aws_subnet.prod_1.id
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

resource "aws_s3_bucket" "prod_codedeploy" {
  tags = {
    Name = "production"
  }
}

resource "aws_codedeploy_app" "frontend" {
  name             = "frontend"
  compute_platform = "Server"

  tags = {
    Name = "frontend"
  }
}

data "aws_iam_policy_document" "prod_codedeploy_sts" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codedeploy.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "prod_codedeploy" {
  name               = "prod_codedeploy"
  assume_role_policy = data.aws_iam_policy_document.prod_codedeploy_sts.json

  tags = {
    Name = "production"
  }
}

resource "aws_lb" "frontend" {
  name               = "frontend"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.frontend.id]
  subnets            = [aws_subnet.prod_1.id, aws_subnet.prod_2.id]

  enable_deletion_protection = true

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb_target_group" "frontend" {
  name     = "frontend"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.prod.id

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.frontend.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }

  tags = {
    Name = "frontend"
  }
}

resource "aws_codedeploy_deployment_group" "frontend" {
  app_name              = aws_codedeploy_app.frontend.name
  deployment_group_name = "frontend"
  service_role_arn      = aws_iam_role.prod_codedeploy.arn

  tags = {
    Name = "frontend"
  }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  load_balancer_info {
    elb_info {
      name = aws_lb.frontend.name
    }
  }

  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout    = "STOP_DEPLOYMENT"
      wait_time_in_minutes = 60
    }

    green_fleet_provisioning_option {
      action = "DISCOVER_EXISTING"
    }

    terminate_blue_instances_on_deployment_success {
      action = "KEEP_ALIVE"
    }
  }
}

output "frontend_public_ip_1" {
  value = aws_eip.frontend_1.public_ip
}

output "frontend_public_ip_2" {
  value = aws_eip.frontend_2.public_ip
}

output "production_codedeploy_bucket" {
  value = aws_s3_bucket.prod_codedeploy.bucket
}
