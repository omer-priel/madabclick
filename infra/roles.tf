data "aws_iam_policy_document" "policy_all" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_iam_role" "prod_image_builder" {
  name               = "prod_image_builder"
  description        = "prod_image_builder"
  assume_role_policy = data.aws_iam_policy_document.policy_all.json

  tags = {
    "Name" : "production"
  }
}

resource "aws_iam_role_policy_attachment" "prod_image_builder_AdministratorAccess" {
  role       = aws_iam_role.prod_image_builder.id
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_instance_profile" "prod_image_builder" {
  name = "prod_image_builder"
  role = aws_iam_role.prod_image_builder.name

  tags = {
    "Name" : "production"
  }
}

resource "aws_iam_role" "prod_codedeploy" {
  name               = "prod_codedeploy"
  description        = "prod_codedeploy"
  assume_role_policy = data.aws_iam_policy_document.policy_all.json

  tags = {
    Name = "production"
  }
}

resource "aws_iam_role_policy_attachment" "prod_codedeploy_AdministratorAccess" {
  role       = aws_iam_role.prod_codedeploy.id
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_role" "frontend_instance" {
  name               = "frontend_instance"
  description        = "frontend_instance"
  assume_role_policy = data.aws_iam_policy_document.policy_all.json

  tags = {
    "Name" : "frontend"
  }
}

resource "aws_iam_role_policy_attachment" "frontend_instance_AdministratorAccess" {
  role       = aws_iam_role.frontend_instance.id
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_instance_profile" "frontend_instance" {
  name = "frontend_instance"
  role = aws_iam_role.frontend_instance.name

  tags = {
    "Name" : "frontend"
  }
}
