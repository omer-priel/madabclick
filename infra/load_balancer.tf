resource "aws_lb" "frontend" {
  name               = "frontend"
  load_balancer_type = "application"
  internal           = false
  subnets            = [aws_subnet.prod_a.id, aws_subnet.prod_b.id]
  security_groups    = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }
}

# resource "aws_lb_target_group" "frontend" {
#   name     = "frontend"
#   port     = 80
#   protocol = "HTTP"
#   vpc_id   = aws_vpc.prod.id

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_lb_listener" "frontend" {
#   load_balancer_arn = aws_lb.frontend.arn
#   port              = "80"
#   protocol          = "HTTP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.frontend.arn
#   }

#   tags = {
#     Name = "frontend"
#   }
# }
