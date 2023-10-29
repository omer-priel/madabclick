# resource "aws_ssm_parameter" "app_revalidate" {
#   name  = "/frontend/env/app_revalidate/"
#   description = "env APP_REVALIDATE"
#   type  = "String"

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_ssm_parameter" "google_api_key" {
#   name  = "/frontend/env/google_api_key/"
#   description = "env GOOGLE_API_KEY"
#   type  = "String"

#   tags = {
#     Name = "frontend"
#   }
# }

# resource "aws_ssm_parameter" "google_spreadsheet_id_contents" {
#   name  = "/frontend/env/google_spreadsheet_id_contents/"
#   description = "env GOOGLE_SPREADSHEET_ID_CONTENTS"
#   type  = "String"

#   tags = {
#     Name = "frontend"
#   }
# }
