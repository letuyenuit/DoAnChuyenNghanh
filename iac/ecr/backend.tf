terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "terraform/ecr/terraform.tfstate"
    region = "us-east-1"
  }
}
