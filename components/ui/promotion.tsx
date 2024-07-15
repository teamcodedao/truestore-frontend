interface PromotionProps {
  value: number;
}

export default function Promotion({value}: PromotionProps) {
  return (
    <div className="flex items-center gap-1 rounded bg-red-600 p-1 text-xs font-bold text-white">
      <span className="i-custom-discount"></span>
      <span>SAVE {value}%</span>
    </div>
  );
}
