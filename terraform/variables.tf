variable "region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Project name for all resources"
  default     = "howoldisryan"
}

variable "vpc_id" {
  type        = string
  description = "VPC to deploy into"
  default     = "vpc-c3b70bb9"
}

variable "zone_id" {
  type        = string
  description = "Route53 zone ID"
  default     = "Z09638222JXENL53LJQWF"
}

variable "domain_name" {
  type        = string
  description = "Site domain name, matching client_bucket"
  default     = "howoldisryan.com"
}

variable "certificate_arn" {
  type        = string
  description = "Certificate ARN in ACM"
  default     = "arn:aws:acm:us-east-1:617929423658:certificate/5aa4f18e-821e-475d-b7d2-204ac661ef62"
}
