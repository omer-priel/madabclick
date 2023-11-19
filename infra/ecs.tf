# ECR - repository
resource "aws_ecr_repository" "frontend" {
  name                 = "frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "frontend"
  }
}

# ECS on Fargate - cluster
resource "aws_cloudwatch_log_group" "frontend_ecs" {
  name = "frontend-ecs"

  tags = {
    Name = "frontend"
  }
}

resource "aws_service_discovery_http_namespace" "frontend" {
  name        = "frontend"
  description = "frontend"

  tags = {
    Name = "frontend"
  }
}

resource "aws_ecs_cluster" "frontend" {
  name = "frontend"

  service_connect_defaults {
    namespace = aws_service_discovery_http_namespace.frontend.arn
  }

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  configuration {
    execute_command_configuration {
      logging = "OVERRIDE"

      log_configuration {
        cloud_watch_log_group_name = aws_cloudwatch_log_group.frontend_ecs.name
      }
    }
  }

  tags = {
    Name = "frontend"
  }
}

resource "aws_ecs_cluster_capacity_providers" "frontend" {
  cluster_name = aws_ecs_cluster.frontend.name

  capacity_providers = ["FARGATE"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 1
    capacity_provider = "FARGATE"
  }
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "frontend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048

  container_definitions = jsonencode([
    {
      name        = "frontend"
      image       = "frontend/frontend:latest"
      cpu         = 1024
      memory      = 2048
      essential   = true
      networkMode = "awsvpc"
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])

  tags = {
    Name = "frontend"
  }
}

resource "aws_ecs_service" "frontend" {
  name            = "frontend"
  cluster         = aws_ecs_cluster.frontend.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.frontend.id]
    subnets         = [aws_subnet.frontend_a.id, aws_subnet.frontend_b.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend2.arn
    container_name   = "frontend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.frontend2_http]

  tags = {
    Name = "frontend"
  }
}

# load balancer
resource "aws_lb" "frontend2" {
  name                       = "frontend2"
  load_balancer_type         = "application"
  internal                   = false
  subnets                    = [aws_subnet.frontend_a.id, aws_subnet.frontend_b.id]
  security_groups            = [aws_security_group.frontend.id]
  enable_deletion_protection = false

  tags = {
    Name = "frontend2"
  }
}

resource "aws_lb_target_group" "frontend2" {
  name        = "frontend2"
  target_type = "ip"
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
    Name = "frontend2"
  }
}

resource "aws_lb_listener" "frontend2_http" {
  load_balancer_arn = aws_lb.frontend2.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend2.arn
  }

  tags = {
    Name = "frontend2"
  }
}

resource "aws_iam_server_certificate" "frontend2_https" {
  name             = "frontend2-https"
  certificate_body = file("keys/ca-cert.pem")
  private_key      = file("keys/ca-key.pem")

  tags = {
    Name = "frontend2"
  }
}

resource "aws_lb_listener" "frontend2_https" {
  load_balancer_arn = aws_lb.frontend2.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_iam_server_certificate.frontend2_https.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend2.arn
  }

  tags = {
    Name = "frontend2"
  }
}

# output
output "ecr_repository" {
  value       = aws_ecr_repository.frontend.name
  description = "ECR Repository"
}

output "ecs_load_balancer" {
  value = aws_lb.frontend2.dns_name
}
