terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "infrastructure/terraform/terraform.tfstate"
    region = "us-east-1"
  }
}
