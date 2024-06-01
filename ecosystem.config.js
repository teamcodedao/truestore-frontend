module.exports = {
    apps: [
      {
        name: 'supper-web',
        script: "node_modules/next/dist/bin/next",
        args: "start",
        instances: "8", 
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
};