'use client';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {useDidMount} from 'rooks';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Providers({children}: React.PropsWithChildren) {
  useDidMount(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  });

  return <>{children}</>;
}
