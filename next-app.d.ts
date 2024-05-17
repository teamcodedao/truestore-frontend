export {};

declare global {
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

  type ErrorProps = Readonly<{
    error: ApolloError | Error;
    reset: () => void;
  }>;

  type RouteHandlerContext<P = Record<string | string[]>> = Readonly<{
    params: P;
  }>;
}
