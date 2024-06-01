export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERSION?: string;

      NEXT_API: string;
      NEXT_API_AUTH: string;
      NEXT_CACHE_HANDLER?: 0 | 1;
      NEXT_REDIS_URL?: string;

      NEXT_PUBLIC_EMAIL: string;

      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string;

      NEXT_PUBLIC_FIREBASE_API_KEY: string;

      NEXT_PUBLIC_IMGPROXY_URL: string;
    }
  }

  type LayoutProps<P = Record<string | string[]>> = Readonly<{
    children: React.ReactNode;
    params: P;
  }>;

  type PageProps<
    P = Record<string | string[]>,
    S = Record<string | string[] | undefined>
  > = Readonly<{
    params: P;
    searchParams: S;
  }>;

  type GenerateMetadataProps<P = unknown, S = unknown> = PageProps<P, S>;

  type ErrorProps = Readonly<{
    error: ApolloError | Error;
    reset: () => void;
  }>;

  type RouteHandlerContext<P = Record<string | string[]>> = Readonly<{
    params: P;
  }>;
}
