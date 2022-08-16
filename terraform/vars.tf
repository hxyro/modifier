# EC2
variable "ec2-type" {
  default = "t2.micro"
}
variable "ec2-name" {
  default = "Jenkins-Builder"
}
# Region
variable "region" {
  default = "ap-south-1"
}
variable "availability_zone" {
  default = "ap-south-1a"
}