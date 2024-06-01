module.exports = {
  apps: [
    {
      name: "nextjs-app-dev",
      script: "pnpm",
      args: "dev",
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "nextjs-app-prod",
      script: "pnpm",
      args: "start",
      instances: 3,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
