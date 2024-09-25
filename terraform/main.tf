provider "aws" {
  region = var.region
}

terraform {
  required_version = "= 1.2.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 4.31.0"
    }
  }

  backend "s3" {
    bucket = "chrislewis-tfstate"
    key    = "howoldisryan"
    region = "us-east-1"
  }
}

module "main" {
  source = "github.com/c-d-lewis/terraform-modules//s3-cloudfront-website?ref=master"

  region          = "us-east-1"
  project_name    = "howoldisryan"
  zone_id         = "Z09638222JXENL53LJQWF"
  domain_name     = "howoldisryan.com"
  alt_domain_name = "www.howoldisryan.com"
  certificate_arn = "arn:aws:acm:us-east-1:617929423658:certificate/27f5ef00-0401-4aad-9c22-4f4ea1159eea"
}
