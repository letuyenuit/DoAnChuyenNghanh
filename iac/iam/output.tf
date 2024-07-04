output "role_arn" {
  value = aws_iam_role.ecs-task-execution-role-ecs-fargate.arn
}

output "RDSCustomSQLServerInstanceProfileRole" {
  value = aws_iam_role.RDSCustomSQLServerInstanceProfileRole.arn
}
