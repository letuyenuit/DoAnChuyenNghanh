resource "aws_security_group" "ecs_lb_sg" {
  name   = "Load Balancer Security Group ECS"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    self        = "false"
    cidr_blocks = ["0.0.0.0/0"]
    description = "any"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

