resource "aws_launch_template" "frontend" {
  name                   = "frontend"
  description            = "frontend"
  image_id               = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
  instance_type          = "t2.micro"
  update_default_version = true

  tags = {
    Name = "frontend"
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "frontend"
    }
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.prod_image_builder.name
  }

  network_interfaces {
    device_index = 0

    associate_public_ip_address = true

    delete_on_termination = true

    security_groups = [aws_security_group.frontend.id]
  }
}

resource "aws_autoscaling_group" "frontend" {
  name = "frontend"

  desired_capacity = 2
  min_size         = 2
  max_size         = 2

  health_check_grace_period = 3000
  health_check_type         = "ELB"

  vpc_zone_identifier = [aws_subnet.prod_a.id, aws_subnet.prod_b.id]

  target_group_arns = [aws_lb_target_group.frontend_application.arn]

  tag {
    key                 = "Name"
    value               = "frontend"
    propagate_at_launch = true
  }

  launch_template {
    id      = aws_launch_template.frontend.id
    version = "$Latest"
  }
}

resource "aws_autoscaling_policy" "frontend_target_tracking" {
  name                   = "frontend_target_tracking"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.frontend.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 70.0
  }
}
