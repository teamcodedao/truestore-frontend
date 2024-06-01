import {createClient} from 'redis';

import {CacheHandler} from '@neshca/cache-handler';
import createLruHandler from '@neshca/cache-handler/local-lru';
import createRedisHandler from '@neshca/cache-handler/redis-stack';

CacheHandler.onCreation(async () => {
  let client;

  try {
    client = createClient({
      url: process.env.NEXT_REDIS_URL,
    });

    client.on('error', () => {});
  } catch (error) {
    console.error('Failed to create Redis client:', error);
  }

  if (client) {
    try {
      console.info('Connecting Redis client...');
      await client.connect();
      console.info('Redis client connected.');
    } catch (error) {
      console.error('Failed to connect Redis client:', error);

      console.error('Disconnecting the Redis client...');
      client
        .disconnect()
        .then(() => {
          console.info('Redis client disconnected.');
        })
        .catch(() => {
          console.error(
            'Failed to quit the Redis client after failing to connect.'
          );
        });
    }
  }

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (client?.isReady) {
    handler = await createRedisHandler({
      client,
      keyPrefix: 'next-cache:',
      timeoutMs: 1000,
    });
  } else {
    handler = createLruHandler();
    console.error(
      'Falling back to LRU handler because Redis client is not available.'
    );
  }

  return {
    handlers: [handler],
  };
});

export default CacheHandler;
