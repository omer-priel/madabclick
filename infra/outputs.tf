output "production_bucket" {
  value = aws_s3_bucket.prod.bucket
}

# output "frontend_public_dns_name" {
#   value = aws_lb.frontend_network.dns_name
# }
