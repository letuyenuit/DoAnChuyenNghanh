variable "REGION" {
  default = "us-east-1"
}
variable "NETCORE_REPOSITORY_NAME" {
  default = "netcore"
}
variable "REACTJS_REPOSITORY_NAME" {
  default = "reactjs"
}

variable "NODEJS_REPOSITORY_NAME" {
  default = "nodejs"
}
variable "ECR_REPOS" {
  type    = list(string)
  default = ["netcore", "reactjs", "nodejs"]
}
