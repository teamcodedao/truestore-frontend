import dayjs from 'dayjs';

export function getCurrentEventInfo() {
  const now = dayjs();

  const event_url = (() => {
    try {
      return window.location.href;
    } catch {
      return '';
    }
  })();

  return {
    event_day: now.format('dddd'),
    event_month: now.format('MMMM'),
    event_time: `${now.hour()} - ${now.add(1, 'hour').hour()}`,
    event_url,
  };
}

export function getGenerelParameters() {
  return {
    ...getCurrentEventInfo(),
    plugin: 'DevReact',
    user_role: 'guest',
    traffic_source: 'direct',
  };
}
