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
