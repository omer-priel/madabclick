output "production_bucket" {
  value = aws_s3_bucket.prod.bucket
}

output "frontend_public_ip" {
  value = aws_eip.frontend.public_ip
}

output "frontend_public_dns_name" {
  value = aws_eip.frontend.public_dns
}
