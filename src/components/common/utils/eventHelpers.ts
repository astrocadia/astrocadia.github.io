import { KeyboardEvent, MouseEvent } from 'react';

export type MouseOrKeyboardEvent =
  | MouseEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>;
export type MouseOrKeyboardEventHandler = (e: MouseOrKeyboardEvent) => void;

export const isKeyboardEvent = (
  e: MouseOrKeyboardEvent
): e is KeyboardEvent<HTMLElement> =>
  (e as KeyboardEvent).type === 'keydown' ||
  (e as KeyboardEvent).type === 'keyup' ||
  (e as KeyboardEvent).type === 'keypress';

export const addKeyHandler = (
  keys: Array<string>,
  onClick?: MouseOrKeyboardEventHandler
): MouseOrKeyboardEventHandler | undefined => {
  if (onClick) {
    return (e) => {
      if (!isKeyboardEvent(e)) {
        onClick(e);
      } else if (isKeyboardEvent(e)) {
        if (keys.includes(e.key)) {
          onClick(e);
        }
      }
    };
  }

  return undefined;
};

export type AddKeyHandlerReturnType = ReturnType<typeof addKeyHandler>;

// `Spacebar' is IE specific value
export const addOnEnterOrSpaceHandler = (
  onClick?: MouseOrKeyboardEventHandler
): AddKeyHandlerReturnType =>
  addKeyHandler(['Enter', ' ', 'Spacebar'], onClick);

export const addOnEnterHandler = (
  onClick?: MouseOrKeyboardEventHandler
): AddKeyHandlerReturnType => addKeyHandler(['Enter'], onClick);
