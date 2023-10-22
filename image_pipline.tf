# resource "aws_imagebuilder_image_recipe" "frontend" {
#   name              = "frontend"
#   parent_image      = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:image/amazon-linux-2-x86/x.x.x"
#   version           = "1.0.0"
#   working_directory = "/tmp"

#   tags = {
#     Name = "frontend"
#   }

#   block_device_mapping {
#     device_name = "/dev/xvdb"

#     ebs {
#       delete_on_termination = true
#       volume_size           = 8
#       volume_type           = "gp2"
#     }
#   }

#   component {
#     component_arn = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:component/amazon-cloudwatch-agent-linux/x.x.x"
#   }

#   component {
#     component_arn = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:component/update-linux/x.x.x"
#   }

#   component {
#     component_arn = "arn:${var.aws_partition}:imagebuilder:${var.aws_region}:aws:component/simple-boot-test-linux/x.x.x"
#   }
# }

# data "aws_iam_policy_document" "prod_image_builder_policy_ec2" {
#   statement {
#     actions = [
#       "sts:AssumeRole"
#     ]

#     principals {
#       type        = "Service"
#       identifiers = ["ec2.amazonaws.com"]
#     }
#   }
# }

# data "aws_iam_policy_document" "prod_image_builder_policy_s3" {
#   statement {
#     actions = [
#       "s3:*",
#       "s3-object-lambda:*"
#     ]

#     principals {
#       type        = "AWS"
#       identifiers = ["*"]
#     }
#   }
# }

# resource "aws_iam_role" "prod_image_builder" {
#   name               = "prod_image_builder"
#   description        = "prod_image_builder"
#   assume_role_policy = data.aws_iam_policy_document.prod_image_builder_policy_ec2.json

#   inline_policy {
#     policy = data.aws_iam_policy_document.prod_image_builder_policy_s3.json
#   }

#   tags = {
#     "Name" : "production"
#   }
# }

# resource "aws_iam_instance_profile" "prod_image_builder" {
#   name = "prod_image_builder"
#   role = aws_iam_role.prod_image_builder.name

#   tags = {
#     "Name" : "production"
#   }
# }

# resource "aws_s3_bucket" "frontend_logs" {
#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_imagebuilder_infrastructure_configuration" "frontend" {
#   name                          = "frontend"
#   description                   = "frontend"
#   instance_profile_name         = aws_iam_instance_profile.prod_image_builder.name
#   instance_types                = ["t2.micro"]
#   key_pair                      = aws_key_pair.fontend.key_name
#   security_group_ids            = [aws_security_group.frontend.id]
#   subnet_id                     = aws_subnet.prod_1.id
#   terminate_instance_on_failure = true

#   tags = {
#     Name = "frontend"
#   }

#   logging {
#     s3_logs {
#       s3_bucket_name = aws_s3_bucket.frontend_logs.bucket
#       s3_key_prefix  = "logs"
#     }
#   }
# }

# resource "aws_imagebuilder_distribution_configuration" "frontend" {
#   name        = "frontend"
#   description = "frontend"

#   tags = {
#     Name = "frontend"
#   }

#   distribution {
#     region = var.aws_region

#     ami_distribution_configuration {
#       name        = "frontend-{{ imagebuilder:buildDate }}"
#       description = "frontend"

#       ami_tags = {
#         Name = "frontend"
#       }
#     }
#   }
# }

# resource "aws_imagebuilder_image_pipeline" "frontend" {
#   name                             = "frontend"
#   description                      = "frontend"
#   image_recipe_arn                 = aws_imagebuilder_image_recipe.frontend.arn
#   infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.frontend.arn
#   distribution_configuration_arn   = aws_imagebuilder_distribution_configuration.frontend.arn

#   tags = {
#     Name = "frontend"
#   }
# }
