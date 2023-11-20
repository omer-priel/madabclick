output "frontend_public_dns_name" {
  value       = aws_lb.frontend.dns_name
  description = "Domain Name of the Load Balancer for frontend"
}
