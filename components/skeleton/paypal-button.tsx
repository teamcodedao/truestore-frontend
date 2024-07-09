import {cn} from '@/lib/cn';

interface PaypalButtonSkeleton extends React.ComponentProps<'div'> {}

export default function PaypalButtonSkeleton({
  className,
  ...rest
}: PaypalButtonSkeleton) {
  return (
    <div {...rest} className={cn(className, 'animate-pulse space-y-4')}>
      <div className="flex h-[53px] items-center justify-center rounded-md bg-slate-200">
        <div className="h-[20px] w-[90px] max-w-full bg-slate-300"></div>
      </div>
      <div className="flex h-[53px] items-center justify-center rounded-md bg-slate-200">
        <div className="h-[20px] w-[270px] max-w-full bg-slate-300"></div>
      </div>
      <div className="flex justify-center">
        <div className="h-[16px] w-[200px] max-w-full bg-slate-100"></div>
      </div>
    </div>
  );
}
