module "vpc" {
  source = "./../vpc"
}

resource "aws_db_subnet_group" "default_rds_mssql" {
  name        = "rds-mssql-subnet-group"
  description = "Subnet group for rds-mssql private subnet group."
  subnet_ids  = module.vpc.public_subnets
}

resource "aws_security_group" "rds_mssql_security_group" {
  name        = "all-rds-mssql-internal"
  description = "allow all vpc traffic to rds mssql."
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 1433
    to_port   = 1433
    protocol  = "tcp"
  }
}

resource "aws_db_instance" "default_mssql" {
  identifier              = "sqlserver-chat-db"
  allocated_storage       = 20
  license_model           = "license-included"
  storage_type            = "gp3"
  engine                  = "sqlserver-ex"
  engine_version          = "15.00.4375.4.v1"
  instance_class          = "db.t3.micro"
  multi_az                = false
  username                = "chatdb"
  password                = "admin1234"
  vpc_security_group_ids  = ["${aws_security_group.rds_mssql_security_group.id}"]
  db_subnet_group_name    = aws_db_subnet_group.default_rds_mssql.id
  backup_retention_period = 3
}


