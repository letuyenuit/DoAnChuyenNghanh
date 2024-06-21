output "reactjs_image" {
  value = data.aws_ecr_image.reactjs_service_image.image_uri
}
