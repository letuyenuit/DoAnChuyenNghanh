terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "deployment/terraform/terraform.tfstate"
    region = "us-east-1"
  }
}
