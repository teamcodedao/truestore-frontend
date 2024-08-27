import {getGenerelParameters} from './utils';

export class SnapPixel {
  private isReady: boolean | null = null;
  private queueList: Array<() => void> = [];

  initialize(ids: string[]) {
    if (this.isReady != null) {
      return;
    }

    if (ids.length) {
      this.isReady = false;
      this.initializeSdk(ids);
    }
  }

  private async initializeSdk(ids: string[]) {
    let timer: NodeJS.Timeout;
    const isReady = await new Promise<boolean>(resolve => {
      const timeout = setTimeout(() => {
        clearInterval(timer);
        resolve(false);
      }, 10_000);
      timer = setInterval(() => {
        if (typeof window !== 'undefined' && 'snaptr' in window) {
          clearInterval(timer);
          clearTimeout(timeout);
          resolve(true);
        }
      }, 10);
    });

    this.isReady = isReady;

    if (isReady) {
      ids.forEach(id => {
        window.snaptr('init', id, {});
      });
      for (const handler of this.queueList) {
        handler();
      }
    }
  }

  trackEvent(eventName: string, parameters?: Record<string, unknown>) {
    const handler = () => {
      window.snaptr('track', eventName, {
        ...parameters,
        ...getGenerelParameters(),
      });
    };

    if (this.isReady) {
      handler();
    } else if (this.isReady === null) {
      this.queueList.push(handler);
    }
  }

  trackPageView(parameters?: Record<string, unknown>) {
    this.trackEvent('PAGE_VIEW', parameters);
  }

  trackPurchase(parameters?: Record<string, unknown>) {
    this.trackEvent('PURCHASE', parameters);
  }

  // Thêm các phương thức tracking khác nếu cần
}

// Thêm khai báo kiểu cho window object
declare global {
  interface Window {
    snaptr: any;
  }
}
