resource "aws_ssm_parameter" "frontend_env_google_api_key" {
  name        = "/frontend/env/google_api_key"
  type        = "String"
  value       = "-"
  description = "GOOGLE_API_KEY environment variable for frontend"

  tags = {
    Name = "frontend"
  }

  lifecycle {
    ignore_changes = [
      value
    ]
  }
}

resource "aws_ssm_parameter" "frontend_env_google_spreadsheet_id_contents" {
  name        = "/frontend/env/google_spreadsheet_id_contents"
  type        = "String"
  value       = "-"
  description = "GOOGLE_SPREADSHEET_ID_CONTENTS environment variable for frontend"

  tags = {
    Name = "frontend"
  }

  lifecycle {
    ignore_changes = [
      value
    ]
  }
}

resource "aws_ssm_parameter" "frontend_env_mongo_uri" {
  name        = "/frontend/env/mongo_uri"
  type        = "String"
  value       = "-"
  description = "MONGO_URI environment variable for frontend"

  tags = {
    Name = "frontend"
  }

  lifecycle {
    ignore_changes = [
      value
    ]
  }
}
