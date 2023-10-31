module.exports = {
  apps: [
    {
      name: 'frontend',
      exec_mode: 'cluster',
      instances: 2,
      script: 'yarn',
      args: 'start',
      cwd: '/var/frontend',
    },
  ],
};
