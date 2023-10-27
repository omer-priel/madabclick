resource "aws_s3_bucket" "prod" {
  tags = {
    Name = "production"
  }
}

output "production_bucket" {
  value = aws_s3_bucket.prod.bucket
}
