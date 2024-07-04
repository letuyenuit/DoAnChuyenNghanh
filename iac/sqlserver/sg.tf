resource "aws_security_group" "rds_mssql_security_group" {
  name   = "all-rds-mssql-internal"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port = 1433
    to_port   = 1433
    protocol  = "tcp"
  }
}
