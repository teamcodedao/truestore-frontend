interface BaseEventProps {
  action: 'open' | 'close';

  ssr?: boolean;
  loading?: React.ReactNode;
  fallback?: React.ReactElement;
  content: React.ReactNode;
}

export type EventProps = BaseEventProps &
  (
    | {
        direction: 'bottom';
        height?: number;
      }
    | {
        direction: 'left' | 'right';
      }
  );
