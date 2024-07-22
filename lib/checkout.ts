import {randomNumber} from './random';

export function generateReferenceId() {
  const domainPart = (() => {
    try {
      return window.location.origin.replace(/\.com$/, '').replace(/\.+/g, '');
    } catch {
      return '';
    }
  })();
  const randomChars = Math.random().toString(36).slice(2, 7);

  const referenceId = `${domainPart}-${randomChars}-${randomNumber(10000, 99999)}`;
  return referenceId;
}
