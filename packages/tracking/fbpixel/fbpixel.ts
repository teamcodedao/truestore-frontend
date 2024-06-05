import {getGenerelParameters} from './utils';

export class Fbpixel {
  private isReady: boolean | null = null;
  private queueList: Array<() => void> = [];

  initialize(ids: string[]) {
    if (this.isReady != null) {
      return;
    }

    if (ids.length) {
      this.isReady = false;
      this.initializeSdk();
    }
  }

  private async initializeSdk() {
    let timer: NodeJS.Timeout;
    const isReady = await new Promise<boolean>(resolve => {
      const timout = setTimeout(() => {
        clearInterval(timer);
        resolve(false);
      }, 10_000);
      timer = setInterval(() => {
        if (typeof window !== 'undefined' && 'fbq' in window) {
          clearInterval(timer);
          clearTimeout(timout);
          resolve(true);
        }
      }, 10);
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
    const generel = getGenerelParameters();

    function handler() {
      fbq('track', 'PageView', {
        ...parameters,
        ...generel,
        landing_page: generel.event_url,
      });
    }

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackViewContent(
    parameters?: facebook.Pixel.ViewContentParameters & Record<string, unknown>
  ) {
    const generel = getGenerelParameters();

    function handler() {
      fbq('track', 'ViewContent', {
        ...parameters,
        ...generel,
        landing_page: generel.event_url,
      });
    }

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackInitiateCheckout(
    parameters?: facebook.Pixel.InitiateCheckoutParameters &
      Record<string, unknown>
  ) {
    const generel = getGenerelParameters();

    function handler() {
      fbq('track', 'InitiateCheckout', {
        ...parameters,
        ...generel,

        // Custom properties
        page_title: 'Checkout',
        landing_page: generel.event_url,
      });
    }

    if (this.isReady) {
      handler();
    } else {
      // isReady is null
      this.queueList.push(handler);
    }
  }

  trackPurchase(
    parameters?: facebook.Pixel.PurchaseParameters & Record<string, unknown>
  ) {
    const generel = getGenerelParameters();

    function handler() {
      fbq('track', 'Purchase', {
        ...parameters,
        ...generel,

        // Custom properties
        landing_page: generel.event_url,
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
