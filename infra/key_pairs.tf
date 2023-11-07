resource "aws_key_pair" "frontend" {
  key_name   = "frontend"
  public_key = var.frontend_public_key

  tags = {
    Name = "frontend"
  }
}
