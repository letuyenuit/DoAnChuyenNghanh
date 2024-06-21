terraform {
  backend "s3" {
    bucket = "terraform-chats"
    key    = "terraform/ecs-cluster/terraform.tfstate"
    region = "us-east-1"
  }
}
