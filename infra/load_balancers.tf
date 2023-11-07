resource "aws_lb" "frontend" {
  name                       = "frontend"
  load_balancer_type         = "application"
  internal                   = false
  subnets                    = [aws_subnet.frontend_a.id, aws_subnet.frontend_b.id]
  security_groups            = [aws_security_group.frontend.id]
  enable_deletion_protection = true

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb_target_group" "frontend" {
  name        = "frontend"
  target_type = "instance"
  vpc_id      = aws_vpc.prod.id
  protocol    = "HTTP"
  port        = 80

  health_check {
    path                = "/api/health-check/"
    port                = 80
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 4
    timeout             = 60
    interval            = 120
  }

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb_listener" "frontend_http" {
  load_balancer_arn = aws_lb.frontend.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }

  tags = {
    Name = "frontend"
  }
}
