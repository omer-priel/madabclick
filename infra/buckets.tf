resource "aws_s3_bucket" "prod" {
  tags = {
    Name = "production"
  }
}
