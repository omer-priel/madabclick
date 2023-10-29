output "production_bucket" {
  value = aws_s3_bucket.prod.bucket
}

output "frontend_image_id" {
  value = tolist(aws_imagebuilder_image.frontend.output_resources[0].amis)[0].image
}

output "frontend_application_load_balancer_dns_name" {
  value = aws_lb.frontend_application.dns_name
}

output "frontend_network_load_balancer_dns_name" {
  value = aws_lb.frontend_network.dns_name
}

output "frontend_public_ip" {
  value = aws_eip.frontend.public_ip
}

output "frontend_public_dns_name" {
  value = aws_eip.frontend.public_dns
}
