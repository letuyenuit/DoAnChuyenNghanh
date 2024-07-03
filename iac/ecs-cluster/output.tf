output "ecs" {
  value = module.ecs
}

output "namespace" {
  value = aws_service_discovery_http_namespace.chat.arn
}

output "ecs_cluster_id" {
  value = module.ecs.cluster_id
}
