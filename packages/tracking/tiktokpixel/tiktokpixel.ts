import {getGenerelParameters} from './utils';

export class TiktokPixel {
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
        if (typeof window !== 'undefined' && 'ttq' in window) {
          clearInterval(timer);
          clearTimeout(timeout);
          resolve(true);
        }
      }, 10);
    });

    this.isReady = isReady;

    if (isReady) {
      ids.forEach(id => window.ttq.load(id));
      for (const handler of this.queueList) {
        handler();
      }
    }
  }

  trackToCart(
    parameters: tiktok.Pixel.AddToCartParameters & Record<string, unknown>,
  ) {
    if (this.isReady === false) {
      return;
    }

    const handler = () => {
      window.ttq.track('AddToCart', {
        ...parameters,
        ...getGenerelParameters(),
        category_name: 'Uncategorized',
        content_type: 'product',
        currency: 'USD',
        // Custom parameters
        page_title: parameters.content_name,
        post_type: parameters.content_type,
      });
    };

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackPageView(parameters?: Record<string, unknown>) {
    const generel = getGenerelParameters();

    const handler = () => {
      window.ttq.track('PageView', {
        ...parameters,
        ...generel,
        landing_page: generel.event_url,
      });
    };

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackViewContent(
    parameters?: tiktok.Pixel.ViewContentParameters & Record<string, unknown>,
  ) {
    const generel = getGenerelParameters();

    const handler = () => {
      window.ttq.track('ViewContent', {
        ...parameters,
        ...generel,
        landing_page: generel.event_url,
      });
    };

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackInitiateCheckout(
    parameters?: tiktok.Pixel.InitiateCheckoutParameters &
      Record<string, unknown>,
  ) {
    const generel = getGenerelParameters();

    const handler = () => {
      window.ttq.track('InitiateCheckout', {
        ...parameters,
        ...generel,

        // Custom properties
        page_title: 'Checkout',
        landing_page: generel.event_url,
      });
    };

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackPurchase(
    parameters?: tiktok.Pixel.PurchaseParameters & Record<string, unknown>,
  ) {
    const generel = getGenerelParameters();

    const handler = () => {
      window.ttq.track('Purchase', {
        ...parameters,
        ...generel,

        // Custom properties
        landing_page: generel.event_url,
      });
    };

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }
}

// Add type declaration for window.ttq
declare global {
  interface Window {
    ttq: {
      load: (id: string) => void;
      track: (event: string, params?: any) => void;
    };
  }
}
