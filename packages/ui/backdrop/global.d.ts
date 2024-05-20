import {EVENT_NAME} from './constants';
import {EventProps} from './typings';

export {};

declare global {
  interface HTMLElementEventMap {
    [EVENT_NAME]: CustomEvent<EventProps>;
  }
}
