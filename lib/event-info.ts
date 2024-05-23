export function getCurrentEventInfo() {
    const date = new Date();
    
    // Get the current day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const event_day = days[date.getDay()];
    
    // Get the current month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const event_month = months[date.getMonth()];
    
    // Get the current time range (assuming 1-hour intervals)
    const hours = date.getHours();
    const event_time = `${hours}-${hours+1}`;
    
    return {
        event_day: event_day,
        event_month: event_month,
        event_time: event_time,
        event_url: window.location.href
    };
}