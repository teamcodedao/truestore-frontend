export interface EventProps {
  action: 'open' | 'close';
  direction: 'left' | 'right';
  loading?: React.ReactNode;
  fallback?: React.ReactElement;
  content: React.ReactNode;
}
