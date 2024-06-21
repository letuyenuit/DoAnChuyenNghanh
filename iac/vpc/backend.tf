terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "terraform/vpc/terraform.tfstate"
    region = "us-east-1"
  }
}
