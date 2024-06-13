import {Provider} from './product-context';
import type {Product} from './typings';

export function ProductProvider({
  children,
  initialState,
}: React.PropsWithChildren<{initialState: Product}>) {
  return <Provider initialState={initialState}>{children}</Provider>;
}
