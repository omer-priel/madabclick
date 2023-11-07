data "aws_ssm_parameter" "frontend_env_google_api_key" {
  name = "/frontend/env/google_api_key"
}

data "aws_ssm_parameter" "frontend_env_google_spreadsheet_id_contents" {
  name = "/frontend/env/google_spreadsheet_id_contents"
}

data "aws_ssm_parameter" "frontend_env_mongo_uri" {
  name = "/frontend/env/mongo_uri"
}
