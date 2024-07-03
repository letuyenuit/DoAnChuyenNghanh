//VPC output

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "az_zones" {
  value = module.vpc.az_zones
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "sg_id" {
  value = module.vpc.sg_id
}

// IAM output

output "role_arn" {
  value = module.iam.role_arn
}

// ecs cluster output
output "namespace" {
  value = module.ecs.namespace
}

output "ecs_cluster_id" {
  value = module.ecs.ecs_cluster_id
}
