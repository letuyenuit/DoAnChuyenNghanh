module "ecs_service_netcore" {
  source = "./netcore"
}

module "ecs_service_reactjs" {
  source = "./reactjs"
}


module "ecs_service_nodejs" {
  source = "./nodejs"
}
