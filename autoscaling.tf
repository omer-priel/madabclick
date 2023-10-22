# resource "aws_network_interface" "frontend" {
#   subnet_id       = aws_subnet.prod_1.id
#   private_ips     = ["10.0.1.51", "10.0.1.52", "10.0.1.53", "10.0.1.54"]
#   security_groups = [aws_security_group.frontend.id]

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_launch_template" "frontend" {
#   name          = "frontend"
#   image_id      = "ami-0fb820135757d28fd"
#   instance_type = "t2.micro"

#   tags = {
#     Name = "frontend"
#   }

#   network_interfaces {
#     network_interface_id = aws_network_interface.frontend.id
#     network_card_index   = 0
#   }
# }

# resource "aws_autoscaling_group" "frontend" {

#   target_group_arns  = [aws_lb_target_group.frontend.arn]
#   availability_zones = [var.aws_availability_zone_1]

#   force_delete = true

#   desired_capacity = 1
#   min_size         = 1
#   max_size         = 1

#   tag {
#     key                 = "Name"
#     value               = "frontend"
#     propagate_at_launch = true
#   }

#   launch_template {
#     id      = aws_launch_template.frontend.id
#     version = "$Latest"
#   }
# }
