
# Save in log
echo application-start.sh >> /var/log/frontend-deployment.txt
date >> /var/log/frontend-deployment.txt

# Start the server
cd /var/frontend
pm2 startOrRestart ecosystem.config.js

echo '' >> /var/log/frontend-deployment.txt
