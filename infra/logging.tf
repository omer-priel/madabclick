resource "aws_cloudwatch_log_group" "frontend_ecs" {
  name = "frontend-ecs"

  tags = {
    Name = "frontend"
  }
}
