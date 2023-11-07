resource "aws_s3_bucket" "prod" {
  tags = {
    Name = "production"
  }
}

resource "aws_s3_bucket_versioning" "prod" {
  bucket = aws_s3_bucket.prod.id

  versioning_configuration {
    status = "Enabled"
  }
}
