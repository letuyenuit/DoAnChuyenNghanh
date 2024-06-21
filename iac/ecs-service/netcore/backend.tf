terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "terraform/ecs-netcore-svc/terraform.tfstate"
    region = "us-east-1"
  }
}
