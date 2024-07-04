data "terraform_remote_state" "infrastructure" {
  backend = "s3"
  config = {
    bucket = "terraform-chats"
    key    = "infrastructure/terraform/terraform.tfstate"
    region = "us-east-1"
  }
}
