# Multi-Tenant App for WooCommerce API

This application allows you to deploy multiple WooCommerce websites on a single system, with each website having its own domain.

## Getting started

If you want to run the app on a different port, you can export the port before running the commands below:

```bash
export PORT=3001
```

Run the app using the following commands:

```bash
pnpm dev
docker compose up -d
```

Update the `/etc/hosts` file with the following content:

```
127.0.0.1 shop1.truestore.com shop2.truestore.com
```

## Clean up

To clean up the code, run the following commands:

```bash
pnpm lint:fix
./node_modules/.bin/tsc
```

## License

## link dev https://shop1.truestore.com/product/liftmovertool015ts