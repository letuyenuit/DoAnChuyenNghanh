data "terraform_remote_state" "iam" {
  backend = "s3"
  config = {
    bucket = "terraform-chats"
    key    = "terraform/iam/terraform.tfstate"
    region = "us-east-1"
  }
}
data "terraform_remote_state" "ecr" {
  backend = "s3"
  config = {
    bucket = "terraform-chats"
    key    = "terraform/ecr/terraform.tfstate"
    region = "us-east-1"
  }
}


data "terraform_remote_state" "ecs_cluster" {
  backend = "s3"
  config = {
    bucket = "terraform-chats"
    key    = "terraform/ecs-cluster/terraform.tfstate"
    region = "us-east-1"
  }
}


data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = "terraform-chats"
    key    = "terraform/vpc/terraform.tfstate"
    region = "us-east-1"
  }
}


data "aws_ecr_image" "nodejs_service_image" {
  repository_name = var.NODEJS_REPOSITORY_NAME
  most_recent     = true
}
