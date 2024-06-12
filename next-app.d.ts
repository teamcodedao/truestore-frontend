export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERSION?: string;

      NEXT_CACHE_HANDLER?: 0 | 1;
      NEXT_REDIS_URL?: string;

      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string;
      NEXT_PUBLIC_GA_ID: string;

      NEXT_PUBLIC_SENTRY_DSN?: string;
      SENTRY_AUTH_TOKEN?: string;
    }
  }

  type Device = 'mobile' | 'table' | 'desktop';

  type Size = 'base' | 'sm';

  type Aspect = 'square' | 'video' | (string & object);

  type LayoutProps<P = object> = Readonly<{
    children: React.ReactNode;
    params: P & {device: Device; domain: string};
  }>;

  type PageProps<P = object, S = object> = Readonly<{
    params: P & {device: Device; domain: string};
    searchParams: S;
  }>;

  type GenerateMetadataProps<P = unknown, S = unknown> = PageProps<P, S>;

  type ErrorProps = Readonly<{
    error: ApolloError | Error;
    reset: () => void;
  }>;

  type RouteHandlerContext<P = object> = Readonly<{
    params: P;
  }>;
}
