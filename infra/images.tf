resource "aws_imagebuilder_component" "frontend" {
  name        = "frontend"
  description = "component for frontend image"
  platform    = "Linux"
  version     = "1.0.0"

  data = yamlencode({
    phases = [{
      name = "build"
      steps = [{
        name   = "image-component-build"
        action = "ExecuteBash"
        inputs = {
          commands = split("\n", chomp(templatefile("./tf-templates/image-component-build.sh.tftpl", {
            aws_region = var.aws_region
          })))
        }
      }]
    }]
    schemaVersion = 1.0
  })

  tags = {
    Name = "frontend"
  }
}

resource "aws_imagebuilder_image_recipe" "frontend" {
  name              = "frontend"
  parent_image      = "ami-04376654933b081a7"
  version           = "1.0.0"
  working_directory = "/tmp"

  tags = {
    Name = "frontend"
  }

  block_device_mapping {
    device_name = "/dev/xvda"

    ebs {
      volume_size           = 28
      volume_type           = "gp2"
      delete_on_termination = true
    }
  }

  component {
    component_arn = "arn:aws:imagebuilder:${var.aws_region}:aws:component/amazon-cloudwatch-agent-linux/x.x.x"
  }

  component {
    component_arn = "arn:aws:imagebuilder:${var.aws_region}:aws:component/update-linux/x.x.x"
  }

  component {
    component_arn = "arn:aws:imagebuilder:${var.aws_region}:aws:component/aws-codedeploy-agent-linux/x.x.x"
  }

  component {
    component_arn = "arn:aws:imagebuilder:${var.aws_region}:aws:component/simple-boot-test-linux/x.x.x"
  }

  component {
    component_arn = aws_imagebuilder_component.frontend.arn
  }
}

resource "aws_imagebuilder_infrastructure_configuration" "frontend" {
  name                          = "frontend"
  description                   = "frontend"
  instance_profile_name         = aws_iam_instance_profile.prod_image_builder.name
  instance_types                = ["t2.micro"]
  terminate_instance_on_failure = true

  tags = {
    Name = "frontend"
  }

  logging {
    s3_logs {
      s3_bucket_name = aws_s3_bucket.prod.bucket
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

resource "aws_imagebuilder_image" "frontend" {
  distribution_configuration_arn   = aws_imagebuilder_distribution_configuration.frontend.arn
  image_recipe_arn                 = aws_imagebuilder_image_recipe.frontend.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.frontend.arn

  tags = {
    Name = "frontend"
  }
}
