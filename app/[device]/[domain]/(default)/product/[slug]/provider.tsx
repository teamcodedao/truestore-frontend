'use client';

import {
  type Product,
  ProductProvider as BaseProductProvider,
} from '@model/product';

export default function ProductProvider({
  children,
  initialState,
}: React.PropsWithChildren<{initialState: Product}>) {
  return (
    <BaseProductProvider initialState={initialState}>
      {children}
    </BaseProductProvider>
  );
}
