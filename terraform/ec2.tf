data "aws_ami" "amazon_linux" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  owners = ["amazon"]
}


resource "aws_instance" "web-server" {
  ami               = data.aws_ami.amazon_linux.id
  instance_type     = var.ec2-type
  availability_zone = var.availability_zone
  key_name          = "terra"


  network_interface {
    device_index         = 0
    network_interface_id = aws_network_interface.web_server.id
  }
  user_data = file("jenkins.sh")

  tags = {
    Name = var.ec2-name
  }
}
