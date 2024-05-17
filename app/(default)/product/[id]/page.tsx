import Description from './description';

export default function ProductPage() {
  return (
    <>
      <div>1</div>
      <div>
        <div className='flex items-start gap-x-5'>
          <span className='block rounded-md bg-[orange] px-8 py-2 text-2xl font-semibold text-white'>
            Description
          </span>
          <div className='[&_img]:inline-block'>
            <Description />
          </div>
        </div>
      </div>
    </>
  );
}
