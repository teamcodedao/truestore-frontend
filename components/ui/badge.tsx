import clsx from 'clsx';

interface BadgeProps extends React.PropsWithChildren {
  color?: 'processing' | 'success' | 'default';
}

export default function Badge({color = 'default', children}: BadgeProps) {
  return (
    <span
      className={clsx('inline-block rounded px-2 py-0.5', {
        'bg-gray-200': color === 'default',
        'bg-pink-100 text-pink-500': color === 'processing',
        'bg-green-100 text-green-500': color === 'success',
      })}
    >
      {children}
    </span>
  );
}
