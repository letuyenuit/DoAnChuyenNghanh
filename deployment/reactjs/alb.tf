resource "aws_lb" "chat_alb" {
  name               = var.CHAT_ALB
  internal           = false
  load_balancer_type = "application"
  security_groups    = [data.terraform_remote_state.infrastructure.outputs.sg_id]
  subnets            = data.terraform_remote_state.infrastructure.outputs.public_subnets
  tags = {
    Name = "ecs-alb"
  }
}

resource "aws_lb_listener" "reactjs_alb_listener" {
  load_balancer_arn = aws_lb.chat_alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.reactjs_tg.arn
  }
}
resource "aws_lb_target_group" "reactjs_tg" {
  name        = "reactjs-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.terraform_remote_state.infrastructure.outputs.vpc_id
  target_type = "ip"
  health_check {
    path                = "/test"
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 15
    interval            = 50
  }
}
