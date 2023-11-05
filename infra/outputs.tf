output "production_bucket" {
  value = aws_s3_bucket.prod.bucket
}

output "frontend_ami" {
  value = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
}

output "frontend_public_dns_name" {
  value = aws_lb.frontend.dns_name
}
