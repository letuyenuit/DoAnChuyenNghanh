module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = var.VPC_NAME

  cidr = var.CIDR_BLOCK
  azs  = var.AZ_ZONES

  private_subnets = var.PRIVATE_SUBNETS
  public_subnets  = var.PUBLIC_SUBNETS

  enable_nat_gateway     = true
  single_nat_gateway     = true
  enable_dns_hostnames   = true
  enable_dns_support     = true
  one_nat_gateway_per_az = false
}
