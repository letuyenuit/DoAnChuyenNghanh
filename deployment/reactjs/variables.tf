variable "REGION" {
  default = "us-east-1"
}
variable "NETCORE_TASK_NAME" {
  default = "netcore_task"
}

variable "NODEJS_TASK_NAME" {
  default = "nodejs_task"
}

variable "REACTJS_TASK_NAME" {
  default = "reactjs_task"
}

variable "NETWORK_MODE" {
  default = "awsvpc"
}
variable "REACTJS_SERVICE_NAME" {
  default = "reactjs_service"
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


variable "CHAT_ALB" {
  default = "chat-alb"
}

