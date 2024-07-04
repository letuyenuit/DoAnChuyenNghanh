module "ecr" {
  source = "./ecr"
}

module "vpc" {
  source = "./vpc"
}

module "iam" {
  source = "./iam"
}

module "ecs" {
  source = "./ecs-cluster"
}


module "sqlserver" {
  source = "./sqlserver"
}
