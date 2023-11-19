resource "aws_launch_template" "frontend" {
  name                   = "frontend"
  description            = "frontend"
  image_id               = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
  instance_type          = "t2.micro"
  update_default_version = true

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "frontend"
    }
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.frontend_instance.name
  }

  key_name = aws_key_pair.frontend.key_name

  network_interfaces {
    security_groups = [aws_security_group.frontend.id]

    associate_public_ip_address = true

    delete_on_termination = true
  }

  user_data = base64encode(templatefile("./tf-templates/user_data.sh.tftpl", {}))

  tags = {
    Name = "frontend"
  }
}

resource "aws_autoscaling_group" "frontend" {
  name = "frontend"

  desired_capacity = 2
  min_size         = 2
  max_size         = 10

  vpc_zone_identifier = [aws_subnet.frontend_a.id, aws_subnet.frontend_b.id]

  target_group_arns = [aws_lb_target_group.frontend.arn]

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

resource "aws_autoscaling_policy" "frontend_average_cpu_utilization" {
  name                   = "frontend_average_cpu_utilization"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.frontend.name

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 70.0
  }
}
