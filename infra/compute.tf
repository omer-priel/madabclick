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

  execution_role_arn = aws_iam_role.frontend_ecs_task.arn

  container_definitions = jsonencode([
    {
      name        = "frontend"
      image       = "${aws_ecr_repository.frontend.repository_url}:latest"
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

      environment = [
        {
          name  = "GOOGLE_API_KEY"
          value = aws_ssm_parameter.frontend_env_google_api_key.value
        },
        {
          name  = "GOOGLE_SPREADSHEET_ID_CONTENTS"
          value = aws_ssm_parameter.frontend_env_google_spreadsheet_id_contents.value,
        },
        {
          name  = "MONGO_URI"
          value = aws_ssm_parameter.frontend_env_mongo_uri.value,
        }
      ]
    }
  ])

  tags = {
    Name = "frontend"
  }
}

resource "aws_ecs_service" "frontend" {
  name                 = "frontend"
  cluster              = aws_ecs_cluster.frontend.id
  task_definition      = aws_ecs_task_definition.frontend.arn
  desired_count        = 2
  launch_type          = "FARGATE"
  force_new_deployment = true

  network_configuration {
    security_groups  = [aws_security_group.frontend.id]
    subnets          = [aws_subnet.frontend_a.id, aws_subnet.frontend_b.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "frontend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.frontend_http]

  tags = {
    Name = "frontend"
  }
}
