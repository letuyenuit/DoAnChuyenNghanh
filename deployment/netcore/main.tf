resource "aws_cloudwatch_log_group" "netcore_task_logs" {
  name              = "/ecs/netcore-task"
  retention_in_days = 30
}
resource "aws_ecs_task_definition" "netcore_task" {
  family                   = var.NETCORE_TASK_NAME
  network_mode             = var.NETWORK_MODE
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = data.terraform_remote_state.infrastructure.outputs.role_arn
  cpu                      = 1024
  memory                   = 2048
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  container_definitions = jsonencode([
    {
      name      = "netcore-container"
      image     = data.aws_ecr_image.netcore_service_image.image_uri
      essential = true
      portMappings = [
        {
          name          = "netcore"
          containerPort = 5000
          hostPort      = 5000
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.netcore_task_logs.name
          awslogs-region        = var.REGION
          awslogs-stream-prefix = "app"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "netcore_service" {
  name                 = var.NETCORE_SERVICE_NAME
  cluster              = data.terraform_remote_state.infrastructure.outputs.ecs_cluster_id
  task_definition      = aws_ecs_task_definition.netcore_task.arn
  desired_count        = 1
  force_new_deployment = true

  triggers = {
    redeployment = plantimestamp()
  }
  network_configuration {
    subnets          = data.terraform_remote_state.infrastructure.outputs.public_subnets
    security_groups  = [data.terraform_remote_state.infrastructure.outputs.sg_id]
    assign_public_ip = true
  }
  service_connect_configuration {
    enabled   = true
    namespace = data.terraform_remote_state.infrastructure.outputs.namespace
    service {
      discovery_name = "net-api"
      port_name      = "netcore"
      client_alias {
        dns_name = "net-api.service-connect.me"
        port     = 5000
      }
    }
  }

  # alarms {
  #   enable   = true
  #   rollback = true
  #   alarm_names = [
  #     aws_cloudwatch_metric_alarm.ecs_cpu_high.alarm_name
  #   ]
  # }
}
