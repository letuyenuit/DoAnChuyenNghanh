data "terraform_remote_state" "infrastructure" {
  backend = "s3"
  config = {
    bucket = "terraform-chats"
    key    = "infrastructure/terraform/terraform.tfstate"
    region = "us-east-1"
  }
}


data "aws_ecr_image" "reactjs_service_image" {
  repository_name = var.REACTJS_REPOSITORY_NAME
  most_recent     = true
}
