import type {Except} from 'type-fest';

import {element, EVENT_NAME} from './constants';
import type {EventProps} from './typings';

function showOffcanvas(
  props: Except<EventProps, 'action' | 'direction'> & {
    direction?: Exclude<EventProps['direction'], 'bottom'>;
  },
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

function bottomSheet(
  props: Except<EventProps, 'action' | 'direction'> & {height?: string},
) {
  return showOffcanvas({
    ...props,
    direction: 'bottom' as 'right', // Hack
  });
}

export const offCanvas = {
  show: showOffcanvas,
  close: closeOffcanvas,
  bottomSheet,
};
