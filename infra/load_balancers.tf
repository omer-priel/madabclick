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

resource "aws_iam_server_certificate" "frontend_https" {
  name             = "frontend-https"
  certificate_body = file("keys/frontend-https-cert.pem")
  private_key      = file("keys/frontend-https-key.pem")

  tags = {
    Name = "frontend"
  }
}

resource "aws_acm_certificate" "frontend_https" {
  domain_name       = aws_lb.frontend.dns_name
  validation_method = "DNS"
  private_key       = aws_iam_server_certificate.frontend_https.private_key

  tags = {
    Name = "frontend"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_listener" "frontend_https" {
  load_balancer_arn = aws_lb.frontend.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_iam_server_certificate.frontend_https.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }

  tags = {
    Name = "frontend"
  }
}
