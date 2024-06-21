terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "terraform/ecs-reactjs-svc/terraform.tfstate"
    region = "us-east-1"
  }
}
