import { getCookie } from '../../../utils/cookies';
import { isNil } from '../../../utils/lang';
import { getWSEndpoint } from '../api';
import type {
  WebsocketHandshakeRequest,
  WebsocketSubscribeMultipleExhibitsRequest,
  WebsocketSubscribeMultipleHardwareRequest,
  WebsocketUnsubscribeMultipleExhibitsRequest,
  WebsocketUnsubscribeMultipleHardwareRequest,
} from './websocketRequestPayloads';
import {
  isWebsocketResponse,
  type WebsocketResponseAction,
  type WebsocketResponsePayloadMap,
} from './websocketResponsePayloads';

type MessageEventListenerCallback<
  T extends WebsocketResponseAction = WebsocketResponseAction,
> = (messageData: WebsocketResponsePayloadMap[T]) => void;

export class GumbandWebsocket {
  private static instance: GumbandWebsocket | null;

  private static socket: WebSocket;

  private static exhibitSubscriptions: Set<number>;

  private static hardwareSubscriptions: Set<string>;

  // Bah, I hate the unknown, but either my Typescript is lacking
  // or it can't keep track of the generics to realize they are the same
  // Ideally the key of this map should be the same as the second
  // parameter of addMessageEventListener
  private static listeners: Map<unknown, WebSocket['onmessage']>;

  private static connected: boolean = false;

  private constructor() {
    if (!GumbandWebsocket.instance) {
      GumbandWebsocket.instance = this;
      GumbandWebsocket.exhibitSubscriptions = new Set();
      GumbandWebsocket.hardwareSubscriptions = new Set();
      GumbandWebsocket.listeners = new Map();
      GumbandWebsocket.socket = new WebSocket(getWSEndpoint());
    }
  }

  public static async getInstance(): Promise<GumbandWebsocket> {
    return new Promise((resolve, reject) => {
      if (!GumbandWebsocket.instance) {
        const cookie = getCookie('dltoken');

        if (isNil(cookie)) {
          reject(new Error('dltoken unavailable'));
        } else {
          GumbandWebsocket.instance = new GumbandWebsocket();

          GumbandWebsocket.socket.onopen = () => {
            // Ready the listener for the handshake response
            GumbandWebsocket.socket.addEventListener(
              'message',
              (event: MessageEvent) => {
                const eventResponse = JSON.parse(event.data);
                if (eventResponse.action === 'HANDSHAKE_SUCCESSFUL') {
                  GumbandWebsocket.connected = true;
                  resolve(GumbandWebsocket.instance!); // Need the non-null assertion here because we know it's not null from above
                }
              },
              { once: true } // Remove once received, we only need to listen to this one time per authentication
            );

            // Actually send the handshake request
            GumbandWebsocket.socket.send(
              JSON.stringify({
                action: 'HANDSHAKE',
                data: { jwt: cookie },
              } satisfies WebsocketHandshakeRequest)
            );
          };

          GumbandWebsocket.socket.onclose = () => {
            GumbandWebsocket.connected = false;
          };
        }
      } else {
        resolve(GumbandWebsocket.instance);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public static close() {
    if (GumbandWebsocket.instance) {
      GumbandWebsocket.socket.close();

      GumbandWebsocket.instance = null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public subscribeToExhibits(exhibitId: number | Array<number>) {
    if (Array.isArray(exhibitId)) {
      exhibitId.forEach((id) => {
        GumbandWebsocket.exhibitSubscriptions.add(id);
      });
    } else {
      GumbandWebsocket.exhibitSubscriptions.add(exhibitId);
    }

    GumbandWebsocket.socket.send(
      JSON.stringify({
        action: 'SUBSCRIBE_MULTIPLE_EXHIBITS',
        data: {
          exhibits: Array.from(GumbandWebsocket.exhibitSubscriptions),
        },
      } satisfies WebsocketSubscribeMultipleExhibitsRequest)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public subscribeToHardware(hardwareId: string | Array<string>) {
    if (Array.isArray(hardwareId)) {
      hardwareId.forEach((id) => {
        GumbandWebsocket.hardwareSubscriptions.add(id);
      });
    } else {
      GumbandWebsocket.hardwareSubscriptions.add(hardwareId);
    }

    GumbandWebsocket.socket.send(
      JSON.stringify({
        action: 'SUBSCRIBE_MULTIPLE_HARDWARE',
        data: {
          hardware: Array.from(GumbandWebsocket.hardwareSubscriptions),
        },
      } satisfies WebsocketSubscribeMultipleHardwareRequest)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public unsubscribeFromExhibits(exhibitId: number | Array<number>) {
    if (!GumbandWebsocket.connected) {
      return;
    }

    const exhibitIdsToDelete = Array.isArray(exhibitId)
      ? exhibitId
      : [exhibitId];

    exhibitIdsToDelete.forEach((id) => {
      GumbandWebsocket.exhibitSubscriptions.delete(id);
    });

    GumbandWebsocket.socket.send(
      JSON.stringify({
        action: 'UNSUBSCRIBE_MULTIPLE_EXHIBITS',
        data: {
          exhibits: exhibitIdsToDelete,
        },
      } satisfies WebsocketUnsubscribeMultipleExhibitsRequest)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public unsubscribeFromHardware(hardwareId: string | Array<string>) {
    if (!GumbandWebsocket.connected) {
      return;
    }

    const hardwareIdsToDelete = Array.isArray(hardwareId)
      ? hardwareId
      : [hardwareId];

    hardwareIdsToDelete.forEach((id) => {
      GumbandWebsocket.hardwareSubscriptions.delete(id);
    });

    GumbandWebsocket.socket.send(
      JSON.stringify({
        action: 'UNSUBSCRIBE_MULTIPLE_HARDWARE',
        data: {
          hardware: hardwareIdsToDelete,
        },
      } satisfies WebsocketUnsubscribeMultipleHardwareRequest)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public addMessageEventListener<T extends WebsocketResponseAction>(
    action: T,
    callback: MessageEventListenerCallback<T>
  ) {
    const eventListener = (event: MessageEvent) => {
      const eventResponse = JSON.parse(event.data);

      if (isWebsocketResponse(eventResponse, action)) {
        callback(eventResponse.data);
      }
    };

    GumbandWebsocket.listeners.set(callback, eventListener);

    GumbandWebsocket.socket.addEventListener('message', eventListener);
  }

  // eslint-disable-next-line class-methods-use-this
  public removeMessageEventListener<T extends WebsocketResponseAction>(
    callback: MessageEventListenerCallback<T>
  ) {
    const eventListener = GumbandWebsocket.listeners.get(callback);

    if (eventListener) {
      GumbandWebsocket.socket.removeEventListener('message', eventListener);
    }

    GumbandWebsocket.listeners.delete(eventListener);
  }
}
