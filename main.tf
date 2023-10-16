terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
}

provider "aws" {
  region = "us-east-1"

  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

provider "tls" {
  proxy {
    url = "https://corporate.proxy.service"
  }
}
