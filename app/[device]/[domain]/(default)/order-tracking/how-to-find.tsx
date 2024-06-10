'use client';

import Image from 'next/image';

import howToFindImg1 from '@/images/how-to-find-1.svg';
import howToFindImg2 from '@/images/how-to-find-2.svg';
import offcanvas from '@ui/offcanvas';

export default function HowToFind() {
  return (
    <button
      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      onClick={() => {
        offcanvas.show({
          ssr: false,
          direction: 'right',
          content: (
            <div className="w-[450px] max-w-full px-10 py-5">
              <h3 className="text-2xl font-bold">
                How to find out order number?
              </h3>
              <div className="mt-10 space-y-5 text-center font-medium *:multi-[flex;flex-col;items-center]">
                <div>
                  <Image src={howToFindImg1} alt="" />
                  <p>
                    Your order number is located at the top of your Order
                    Confirmation Email
                  </p>
                </div>
                <div>
                  <Image src={howToFindImg2} alt="" />
                  <p>
                    If you can not find it in your inbox, please check your spam
                    filter or junked folder.
                  </p>
                </div>
              </div>
            </div>
          ),
        });
      }}
    >
      How to find?
    </button>
  );
}
