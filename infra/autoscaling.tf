resource "aws_launch_template" "frontend" {
  name                   = "frontend"
  image_id               = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
  instance_type          = "t2.micro"
  update_default_version = true

  key_name = aws_key_pair.fontend.key_name

  tags = {
    Name = "frontend"
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.prod_image_builder.name
  }

  block_device_mappings {
    device_name = "/dev/xvda"

    ebs {
      volume_size           = 64
      delete_on_termination = true
    }
  }
}

resource "aws_autoscaling_group" "frontend" {
  name = "frontend"

  desired_capacity = 2
  min_size         = 2
  max_size         = 2

  health_check_grace_period = 30

  availability_zones = [var.aws_availability_zone_a, var.aws_availability_zone_b]

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
