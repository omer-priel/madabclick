data "aws_ssm_parameter" "frontend_env_app_revalidate" {
  name = "/frontend/env/app_revalidate"
}

data "aws_ssm_parameter" "frontend_env_google_api_key" {
  name = "/frontend/env/google_api_key"
}

data "aws_ssm_parameter" "frontend_env_google_spreadsheet_id_contents" {
  name = "/frontend/env/google_spreadsheet_id_contents"
}
