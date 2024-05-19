import type {Except, SetOptional} from 'type-fest';

import {element, EVENT_NAME} from './constants';
import {EventProps} from './typings';

function showOffcanvas(
  props: SetOptional<Except<EventProps, 'action'>, 'direction'>
) {
  const event = new CustomEvent<EventProps>(EVENT_NAME, {
    detail: {
      ...props,
      direction: props.direction ?? 'left',
      action: 'open',
    },
  });

  element.dispatchEvent(event);

  return {
    close: closeOffcanvas,
  };
}

function closeOffcanvas() {
  const event = new CustomEvent<Pick<EventProps, 'action'>>(EVENT_NAME, {
    detail: {
      action: 'close',
    },
  });

  element.dispatchEvent(event);
}

export const canvas = {
  show: showOffcanvas,
  close: closeOffcanvas,
};
