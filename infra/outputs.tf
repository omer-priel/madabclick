output "production_bucket" {
  value       = aws_s3_bucket.prod.bucket
  description = "Name of the Production S3 Bucket"
}

output "frontend_ami" {
  value       = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
  description = "AMI Of frontend Image"
}

output "frontend_public_dns_name" {
  value       = aws_lb.frontend.dns_name
  description = "Domain Name of the Load Balancer for frontend"
}
