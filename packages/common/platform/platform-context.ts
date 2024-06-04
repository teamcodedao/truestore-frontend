'use client';

import {createContainer} from 'unstated-next';

import type {PublicPlatformConfig} from './typings';

function usePlatform(initialState?: PublicPlatformConfig) {
  return initialState!;
}

const {Provider, useContainer} = createContainer<
  PublicPlatformConfig,
  PublicPlatformConfig
>(usePlatform);

export {Provider, useContainer as usePlatform};
