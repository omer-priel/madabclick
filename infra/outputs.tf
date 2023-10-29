output "production_bucket" {
  value = aws_s3_bucket.prod.bucket
}

output "frontend_image_id" {
  value = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
}

output "frontend_load_balancer_dns_name" {
  value = aws_lb.frontend.dns_name
}

output "frontend_public_ip" {
  value = aws_eip.fronend.public_ip
}

output "frontend_public_dns_name" {
  value = aws_eip.fronend.public_dns
}
