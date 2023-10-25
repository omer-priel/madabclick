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

resource "aws_iam_role_policy_attachment" "prod_codedeploy_AutoScalingFullAccess" {
  role       = aws_iam_role.prod_codedeploy.name
  policy_arn = "arn:aws:iam::aws:policy/AutoScalingFullAccess"
}

resource "aws_codedeploy_deployment_group" "frontend" {
  app_name              = aws_codedeploy_app.frontend.name
  deployment_group_name = "frontend"
  service_role_arn      = aws_iam_role.prod_codedeploy.arn
  autoscaling_groups    = [aws_autoscaling_group.frontend_blue.id, aws_autoscaling_group.frontend_green.id]

  tags = {
    Name = "frontend"
  }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "IN_PLACE"
  }

  load_balancer_info {
    elb_info {
      name = aws_lb.frontend.name
    }
  }
}
