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

resource "aws_lb_target_group" "frontend" {
  name        = "frontend"
  target_type = "instance"
  vpc_id      = aws_vpc.prod.id
  protocol    = "HTTP"
  port        = 80

  tags = {
    Name = "frontend"
  }

  health_check {
    path                = "/"
    port                = 80
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
  }
}

resource "aws_lb_listener" "frontend" {
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
