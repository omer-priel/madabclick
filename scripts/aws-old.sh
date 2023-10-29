sudo yum update -y
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
sudo chmod 777 /var/www/html
sudo echo "Hello World" > /var/www/html/index.html

sudo systemctl start httpd
