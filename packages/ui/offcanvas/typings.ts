export interface EventProps {
  action: 'open' | 'close';
  direction: 'left' | 'right';
  content: React.ReactNode;
}
