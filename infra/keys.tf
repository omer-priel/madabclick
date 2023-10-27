resource "aws_key_pair" "fontend" {
  key_name   = "fontend_key_pair"
  public_key = var.aws_ssh_key_frontend

  tags = {
    Name = "frontend"
  }
}
