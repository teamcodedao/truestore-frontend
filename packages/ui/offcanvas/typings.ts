export interface EventProps {
  action: 'open' | 'close';
  direction: 'left' | 'right' | 'bottom';
  ssr?: boolean;
  loading?: React.ReactNode;
  fallback?: React.ReactElement;
  content: React.ReactNode;
}
