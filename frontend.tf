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

# new


data "aws_iam_policy_document" "prod_codepipeline_sts" {
  statement {
    effect = "Allow"
    actions = [
      "sts:AssumeRole"
    ]

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "prod_codepipeline" {
  name               = "prod_codepipeline"
  description        = "prod_codepipeline"
  assume_role_policy = data.aws_iam_policy_document.prod_codepipeline_sts.json

  tags = {
    Name = "production"
  }
}

resource "aws_s3_bucket" "prod_codepipeline" {
  tags = {
    Name = "production"
  }
}

resource "aws_codestarconnections_connection" "prod" {
  name          = "production"
  provider_type = "GitHub"

  tags = {
    Name = "production"
  }
}

# data "aws_iam_policy_document" "prod_codebuild_sts" {
#   statement {
#     effect  = "Allow"
#     actions = ["sts:AssumeRole"]

#     principals {
#       type        = "Service"
#       identifiers = ["codebuild.amazonaws.com"]
#     }
#   }
# }

# data "aws_iam_policy_document" "prod_codebuild_ec2" {
#   statement {
#     effect = "Allow"
#     actions = [
#       "ec2:CreateNetworkInterface",
#       "ec2:DescribeDhcpOptions",
#       "ec2:DescribeNetworkInterfaces",
#       "ec2:DeleteNetworkInterface",
#       "ec2:DescribeSubnets",
#       "ec2:DescribeSecurityGroups",
#       "ec2:DescribeVpcs",
#       "ec2:CreateNetworkInterfacePermission"
#     ]

#     principals {
#       type        = "Service"
#       identifiers = ["ec2.amazonaws.com"]
#     }
#   }
# }

# resource "aws_iam_role" "prod_codebuild" {
#   name               = "prod_codebuild"
#   assume_role_policy = data.aws_iam_policy_document.prod_codebuild_sts.json

#   tags = {
#     Name = "production"
#   }

#   inline_policy {
#     policy = data.aws_iam_policy_document.prod_codebuild_ec2.json
#   }
# }

# resource "aws_s3_bucket" "prod_codebuild" {
#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_cloudwatch_log_group" "prod_codebuild" {
#   name = "production_codebuild"

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_codebuild_project" "frontend" {
#   name          = "frontend"
#   description   = "frontend"
#   service_role  = aws_iam_role.prod_codebuild.arn
#   build_timeout = "5"

#   tags = {
#     Name = "frontend"
#   }

#   source {
#     type      = "CODEPIPELINE"
#     buildspec = "aws/codebuild/buildspec.yml"
#   }

#   artifacts {
#     type = "CODEPIPELINE"
#   }

#   environment {
#     compute_type                = "BUILD_GENERAL1_SMALL"
#     image                       = "aws/codebuild/amazonlinux2-x86_64-standard:4.0"
#     type                        = "LINUX_CONTAINER"
#     image_pull_credentials_type = "CODEBUILD"

#     environment_variable {
#       name  = "APP_REVALIDATE"
#       value = var.env_app_revalidate
#     }

#     environment_variable {
#       name  = "GOOGLE_API_KEY"
#       value = var.env_google_api_key
#     }

#     environment_variable {
#       name  = "GOOGLE_SPREADSHEET_ID_CONTENTS"
#       value = var.env_google_spreadsheet_id_contents
#     }
#   }

#   cache {
#     type     = "S3"
#     location = aws_s3_bucket.prod_codebuild.bucket
#   }

#   logs_config {
#     cloudwatch_logs {
#       group_name = aws_cloudwatch_log_group.prod_codebuild.name
#     }
#   }

#   vpc_config {
#     vpc_id             = aws_vpc.prod.id
#     subnets            = [aws_subnet.prod.id]
#     security_group_ids = [aws_security_group.frontend.id]
#   }
# }

# resource "aws_codedeploy_app" "frontend" {
#   name             = "frontend"
#   compute_platform = "Server"

#   tags = {
#     Name = "frontend"
#   }
# }

# data "aws_iam_policy_document" "prod_codedeploy_sts" {
#   statement {
#     effect  = "Allow"
#     actions = ["sts:AssumeRole"]

#     principals {
#       type        = "Service"
#       identifiers = ["codedeploy.amazonaws.com"]
#     }
#   }
# }

# resource "aws_iam_role" "prod_codedeploy" {
#   name               = "prod_codedeploy"
#   assume_role_policy = data.aws_iam_policy_document.prod_codedeploy_sts.json

#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_iam_role_policy_attachment" "prod_codedeploy_AWSCodeDeployRole" {
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
#   role       = aws_iam_role.prod_codedeploy.name
# }

# resource "aws_s3_bucket" "prod_elb" {
#   tags = {
#     Name = "production"
#   }
# }

# resource "aws_elb" "frontend" {
#   name               = "frontend"
#   availability_zones = [var.aws_availability_zone]

#   cross_zone_load_balancing   = true
#   idle_timeout                = 400
#   connection_draining         = true
#   connection_draining_timeout = 400

#   tags = {
#     Name = "frontend"
#   }

#   access_logs {
#     bucket   = aws_s3_bucket.prod_elb.bucket
#     interval = 60
#   }

#   listener {
#     instance_port     = 80
#     instance_protocol = "http"
#     lb_port           = 80
#     lb_protocol       = "http"
#   }

#   # listener {
#   #   instance_port     = 80
#   #   instance_protocol = "http"
#   #   lb_port           = 443
#   #   lb_protocol       = "https"
#   #   ssl_certificate_id = "arn:aws:iam::123456789012:server-certificate/certName"
#   # }

#   health_check {
#     healthy_threshold   = 2
#     unhealthy_threshold = 2
#     timeout             = 3
#     target              = "HTTP:8000/"
#     interval            = 30
#   }
# }

# resource "aws_codedeploy_deployment_group" "frontend" {
#   app_name              = aws_codedeploy_app.frontend.name
#   deployment_group_name = "frontend"
#   service_role_arn      = aws_iam_role.prod_codedeploy.arn

#   tags = {
#     Name = "frontend"
#   }

#   deployment_style {
#     deployment_option = "WITH_TRAFFIC_CONTROL"
#     deployment_type   = "BLUE_GREEN"
#   }

#   load_balancer_info {
#     elb_info {
#       name = aws_elb.frontend.name
#     }
#   }

#   blue_green_deployment_config {
#     deployment_ready_option {
#       action_on_timeout    = "STOP_DEPLOYMENT"
#       wait_time_in_minutes = 60
#     }

#     green_fleet_provisioning_option {
#       action = "DISCOVER_EXISTING"
#     }

#     terminate_blue_instances_on_deployment_success {
#       action = "KEEP_ALIVE"
#     }
#   }
# }

# resource "aws_codepipeline" "frontend" {
#   name     = "frontend"
#   role_arn = aws_iam_role.prod_codepipeline.arn

#   tags = {
#     Name = "frontend"
#   }

#   artifact_store {
#     location = aws_s3_bucket.prod_codepipeline.bucket
#     type     = "S3"
#   }

#   stage {
#     name = "Source"

#     action {
#       name             = "Source"
#       category         = "Source"
#       owner            = "AWS"
#       provider         = "CodeStarSourceConnection"
#       version          = "1"
#       region           = var.aws_region
#       output_artifacts = ["source_output"]

#       configuration = {
#         ConnectionArn    = aws_codestarconnections_connection.prod.arn
#         FullRepositoryId = var.github_repository_id
#         BranchName       = var.github_prod_branch
#       }
#     }
#   }

#   stage {
#     name = "Build"

#     action {
#       name             = "Build"
#       category         = "Build"
#       owner            = "AWS"
#       provider         = "CodeBuild"
#       version          = "1"
#       region           = var.aws_region
#       input_artifacts  = ["source_output"]
#       output_artifacts = ["build_output"]

#       configuration = {
#         ProjectName = aws_codebuild_project.frontend.name
#       }
#     }
#   }

#   stage {
#     name = "Deploy"

#     action {
#       name            = "Deploy"
#       category        = "Deploy"
#       owner           = "AWS"
#       provider        = "CodeDeploy"
#       version         = "1"
#       region          = var.aws_region
#       input_artifacts = ["build_output"]

#       configuration = {
#         ApplicationName     = aws_codedeploy_app.frontend.name
#         DeploymentGroupName = aws_codedeploy_deployment_group.frontend.deployment_group_name
#       }
#     }
#   }
# }

# output "frontend_public_ip" {
#   value = aws_eip.frontend.public_ip
# }
