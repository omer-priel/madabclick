resource "aws_s3_bucket" "frontend_logs" {
  tags = {
    Name = "frontend"
  }
}

resource "aws_s3_bucket" "prod_codedeploy" {
  tags = {
    Name = "production"
  }
}
