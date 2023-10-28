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
