terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "4.0.4"
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

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "eu-central-1"
}

variable "aws_availability_zone" {
  description = "AWS Secret Key"
  type        = string
  default     = "eu-central-1a"
}

variable "aws_partition" {
  description = "AWS Partition"
  type        = string
  default     = "aws"
}

provider "aws" {
  region = var.aws_region

  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

provider "tls" {
  proxy {
    url = "https://corporate.proxy.service"
  }
}
