resource "aws_key_pair" "frontend" {
  key_name   = "frontend"
  public_key = file("keys/frontend-key-pair.pub")

  tags = {
    Name = "frontend"
  }
}
