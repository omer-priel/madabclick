
# Save in log
echo application-start.sh >> /var/log/frontend-deployment.txt
date >> /var/log/frontend-deployment.txt

# Start the server
cd /var/frontend

pm2 delete all
pm2 --name fronend start yarn -- start

echo '' >> /var/log/frontend-deployment.txt
