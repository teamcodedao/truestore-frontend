export interface EventProps {
  action: 'open' | 'close';
  direction: 'left' | 'right';
  title?: string;
  content: React.ReactNode;
}
