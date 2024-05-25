export function getGenerelParameters({userId}: {userId: string}) {
  let userName = window.location.host;
  const searchParams = new URLSearchParams(window.location.search);

  const usTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const timeIds = usTime.split(', ');
  let timeTrack = '';
  let timeTrack2 = '';

  if (timeIds.length > 0) timeTrack = timeIds[0];
  if (timeIds.length > 1) timeTrack2 = timeIds[1];

  if (timeTrack.length < 5) return;

  let isPub = 'PRI';
  const utmSource = searchParams.get('utm_source') || 'none';
  const utmMedium = searchParams.get('utm_medium') || 'none';
  const utmCamp = searchParams.get('utm_campaign') || 'none';
  const utmContent = searchParams.get('utm_content') || 'none';
  const utmTerm = searchParams.get('utm_term') || 'none';

  if (utmSource.length <= 0 || utmSource == 'none') {
    isPub = 'PUB';
  }

  timeTrack = timeTrack.replace(/\//g, '-');
  userName = userName.replace(/\./g, 'DV');
  userId = userId.replace(/\./g, 'DV');

  const navigator_info = window.navigator;
  const screen_info = window.screen;
  let uuid = String(navigator_info.mimeTypes.length);
  uuid += navigator_info.userAgent.replace(/\D+/g, '');
  uuid += navigator_info.plugins.length;
  uuid += screen_info.height || '';
  uuid += screen_info.width || '';
  uuid += screen_info.pixelDepth || '';
  userId += 'DV' + uuid;

  return {
    userId,
    userName,
    utmSource,
    utmMedium,
    utmCamp,
    utmContent,
    utmTerm,
    timeTrack,
    timeTrack2,
    isPub,
  };
}
