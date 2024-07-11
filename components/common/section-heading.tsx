interface SectionHeadingProps extends React.PropsWithChildren {}

export default function SectionHeading({children}: SectionHeadingProps) {
  return (
    <h3 className="w-full rounded-md bg-primary-400 px-8 py-2 text-center text-xl font-semibold text-white sm:w-auto lg:text-2xl">
      {children}
    </h3>
  );
}
