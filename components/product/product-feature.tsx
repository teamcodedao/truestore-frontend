export default function ProductFeature() {
  return (
    <ul className='space-y-3 text-lg *:multi-[`flex;gap-x-2;items-start`] [&_span[class*=i-]]:multi-[`text-2xl;shrink-0;translate-y-px`]'>
      <li>
        <span className='i-radix-icons-globe'></span>
        <div>
          Star Seller. This seller consistently earned 5-star reviews, shipped
          on time, and replied quickly to any messages they received
        </div>
      </li>
      <li>
        <span className='i-carbon-delivery'></span>
        <div>Priority is given to delivery after payment.</div>
      </li>
      <li>
        <span className='i-radix-icons-codesandbox-logo'></span>
        <div>In Stock, Ready To Ship.</div>
      </li>
    </ul>
  );
}
