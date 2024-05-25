import {getGenerelParameters} from './utils';

export class Fbpixel {
  private isReady: boolean | null = null;
  private queueList: Array<() => void> = [];

  async initialize() {
    if (this.isReady != null) {
      return [];
    }

    const response = await fetch(
      'https://king-fruit-slot.firebaseio.com/PXTRUE/ALL/.json'
    );

    if (response.ok) {
      try {
        const data: string = await response.json();
        const ids = data.split('DHV').filter(id => !!id);
        this.initializeSdk();
        return ids;
      } catch {
        return [];
      }
    }

    return [];
  }

  private async initializeSdk() {
    let timer: NodeJS.Timeout;
    const isReady = await new Promise<boolean>(resolve => {
      timer = setInterval(() => {
        if (typeof window !== 'undefined' && 'fbq' in window) {
          clearInterval(timer);
          resolve(true);
        }
      }, 10);

      setTimeout(() => {
        resolve(false);
      }, 10_000);
    });

    this.isReady = isReady;

    if (isReady) {
      for (const handler of this.queueList) {
        handler();
      }
    }
  }

  trackToCart(
    parameters: facebook.Pixel.AddToCartParameters & Record<string, unknown>
  ) {
    if (this.isReady === false) {
      return;
    }

    function handler() {
      fbq('track', 'AddToCart', {
        ...parameters,
        ...getGenerelParameters(),
        category_name: 'Uncategorized',
        content_type: 'product',
        currency: 'USD',
        // Custom parameters
        page_title: parameters.content_name,
        post_type: parameters.content_type,
      });
    }

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackPageView(parameters?: Record<string, unknown>) {
    function handler() {
      fbq('track', 'PageView', {
        ...parameters,
        ...getGenerelParameters(),
      });
    }

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }
}
