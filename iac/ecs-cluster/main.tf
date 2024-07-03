module "ecs" {
  source       = "terraform-aws-modules/ecs/aws"
  cluster_name = var.ECS_CLUSTER

  cluster_settings = {
    "name" : "containerInsights",
    "value" : "enabled"
  }

  cluster_configuration = {
    execute_command_configuration = {
      logging = "OVERRIDE"
      log_configuration = {
        cloud_watch_log_group_name = "/aws/ecs-cluster/${var.ECS_CLUSTER}"
      }
    }
  }

  fargate_capacity_providers = {
    FARGATE = {
      default_capacity_provider_strategy = {
        weight = 100
      }
    }
  }
  tags = {
    Environment = "Production"
    Project     = "DevOps"
  }
}
