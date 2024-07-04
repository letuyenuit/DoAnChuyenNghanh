module "vpc" {
  source = "./../vpc"
}

module "iam" {
  source = "./../iam"
}
data "aws_rds_orderable_db_instance" "custom-sqlserver" {
  engine                     = "sqlserver-ex"
  engine_version             = "15.00.4375.4.v1"
  storage_type               = "gp3"
  preferred_instance_classes = ["db.t3.micro"]
}
resource "aws_kms_key" "key_id_sqlserver" {
  description = "Key for SQL Server"
}
data "aws_kms_key" "by_id" {
  key_id = aws_kms_key.key_id_sqlserver.key_id
}

resource "aws_iam_instance_profile" "instance_profile" {
  name = "AWSRDSCustomSQLServerInstanceProfile"
  role = module.iam.RDSCustomSQLServerInstanceProfileRole
}

resource "aws_db_subnet_group" "rdssubnetgroup" {
  name       = "rdssubnetgroup"
  subnet_ids = module.vpc.private_subnets
  tags = {
    Name = "RDS subnet group"
  }
}

resource "aws_db_instance" "example" {
  allocated_storage           = 20
  auto_minor_version_upgrade  = false
  custom_iam_instance_profile = aws_iam_instance_profile.instance_profile.name
  backup_retention_period     = 7
  db_subnet_group_name        = aws_db_subnet_group.rdssubnetgroup.name
  engine                      = data.aws_rds_orderable_db_instance.custom-sqlserver.engine
  engine_version              = data.aws_rds_orderable_db_instance.custom-sqlserver.engine_version
  identifier                  = "chat-db-mssql"
  instance_class              = data.aws_rds_orderable_db_instance.custom-sqlserver.instance_class
  kms_key_id                  = data.aws_kms_key.by_id.arn
  multi_az                    = false
  password                    = "admin1234@11"
  storage_encrypted           = true
  username                    = "chatdb"

  timeouts {
    create = "3h"
    delete = "3h"
    update = "3h"
  }
}
