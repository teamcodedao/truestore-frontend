'use client';

import {createContainer} from 'unstated-next';

import type {Product} from './typings';

function useProduct(initialState?: Product) {
  return initialState!;
}

const {Provider, useContainer} = createContainer<Product, Product>(useProduct);

export {Provider, useContainer as useProduct};
