import type {Except} from 'type-fest';

import {element, EVENT_NAME} from './constants';
import {EventProps} from './typings';

function showBackdrop(props?: Except<EventProps, 'action'>) {
  const event = new CustomEvent<EventProps>(EVENT_NAME, {
    detail: {
      ...props,
      action: 'open',
    },
  });

  element.dispatchEvent(event);

  return closeBackdrop;
}

function closeBackdrop() {
  const event = new CustomEvent<Pick<EventProps, 'action'>>(EVENT_NAME, {
    detail: {
      action: 'close',
    },
  });

  element.dispatchEvent(event);
}

export const backdrop = {
  show: showBackdrop,
  close: closeBackdrop,
};
