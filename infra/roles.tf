data "aws_iam_policy_document" "policy_all" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_iam_role" "frontend_ecs_task" {
  name               = "frontend_ecs_task"
  description        = "frontend_ecs_task"
  assume_role_policy = data.aws_iam_policy_document.policy_all.json

  tags = {
    "Name" : "frontend"
  }
}

resource "aws_iam_role_policy_attachment" "frontend_ecs_task_AdministratorAccess" {
  role       = aws_iam_role.frontend_ecs_task.id
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
