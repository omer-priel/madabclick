#!/bin/bash
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<html><body><h1>Hello World</h1></body></html>" > /var/www/html/index.html
