variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "eu-central-1"
}

variable "aws_availability_zone_a" {
  description = "AWS Secret Key"
  type        = string
  default     = "eu-central-1a"
}

variable "aws_availability_zone_b" {
  description = "AWS Secret Key"
  type        = string
  default     = "eu-central-1b"
}
