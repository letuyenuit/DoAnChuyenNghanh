resource "aws_ecr_repository" "reactjs_repo" {
  name                 = var.REACTJS_REPOSITORY_NAME
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  force_delete = true
}
resource "aws_ecr_repository" "netcore_repo" {
  name                 = var.NETCORE_REPOSITORY_NAME
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  force_delete = true
}

resource "aws_ecr_repository" "nodejs_repo" {
  name                 = var.NODEJS_REPOSITORY_NAME
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  force_delete = true
}

