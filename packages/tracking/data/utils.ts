export function getUTM(search?: string) {
  let utm = '';
  const searchParams = new URLSearchParams(search ?? window.location.search);

  const utmSource = searchParams.get('utm_source') || 'none';
  const utmMedium = searchParams.get('utm_medium') || 'none';
  const utmCamp = searchParams.get('utm_campaign') || 'none';
  const utmContent = searchParams.get('utm_content') || 'none';
  const utmTerm = searchParams.get('utm_term') || 'none';

  if (
    utmSource != 'none' ||
    utmMedium != 'none' ||
    utmCamp != 'none' ||
    utmContent != 'none' ||
    utmTerm != 'none'
  ) {
    utm =
      utmSource +
      'DHV' +
      utmMedium +
      'DHV' +
      utmCamp +
      'DHV' +
      utmContent +
      'DHV' +
      utmTerm;
  }
  return [
    utm,
    {
      utmSource,
      utmMedium,
      utmCamp,
      utmContent,
      utmTerm,
    },
  ] as const;
}
