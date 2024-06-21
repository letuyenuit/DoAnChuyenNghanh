variable "PRIVATE_SUBNETS" {
  type    = list(string)
  default = ["172.20.1.0/24", "172.20.2.0/24", "172.20.3.0/24"]
}

variable "PUBLIC_SUBNETS" {
  type    = list(string)
  default = ["172.20.4.0/24", "172.20.5.0/24", "172.20.6.0/24"]
}


variable "VPC_NAME" {
  default = "chat-vpc"
}

variable "CIDR_BLOCK" {
  default = "172.20.0.0/16"
}

variable "AZ_ZONES" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}
