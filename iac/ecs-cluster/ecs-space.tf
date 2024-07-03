resource "aws_service_discovery_http_namespace" "chat" {
  name        = var.CLOUDMAP_NAME
  description = "chat namespace"
}
