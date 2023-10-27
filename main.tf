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

variable "aws_availability_zone_1" {
  description = "AWS Secret Key"
  type        = string
  default     = "eu-central-1a"
}

variable "aws_availability_zone_2" {
  description = "AWS Secret Key"
  type        = string
  default     = "eu-central-1b"
}

variable "aws_frontend_image_arn" {
  description = "AWS Frontend Image ID"
  type        = string
  default     = "arn:aws:imagebuilder:eu-central-1:178344858845:image/frontend/1.0.0"
}

variable "github_repository_id" {
  description = "GitHub Full Repository ID"
  type        = string
  default     = "omer-priel/quality-content-for-children"
}

variable "github_prod_branch" {
  description = "GitHub Production Branch"
  type        = string
  default     = "main"
}

variable "env_app_revalidate" {
  default = "env APP_REVALIDATE"
  type    = string
}

variable "env_google_api_key" {
  default = "env GOOGLE_API_KEY"
  type    = string
}

variable "env_google_spreadsheet_id_contents" {
  default = "env GOOGLE_SPREADSHEET_ID_CONTENTS"
  type    = string
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
