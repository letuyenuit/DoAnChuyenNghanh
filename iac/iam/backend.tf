terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "terraform/iam/terraform.tfstate"
    region = "us-east-1"
  }
}
