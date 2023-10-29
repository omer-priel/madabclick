module.exports = {
  apps: [
    {
      name: 'frontend',
      exec_mode: 'cluster',
      instances: 2,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 80',
      cwd: '/var/frontend',
      args: 'start'
    }
  ]
}
