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

output "ecr_repository" {
  value       = aws_ecr_repository.frontend.name
  description = "ECR Repository"
}
