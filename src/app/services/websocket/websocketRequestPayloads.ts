import { ObjectValues } from '../../../utils/usefulTS';
import type { ExhibitSummary } from '../../entities/exhibit';
import { ExhibitComponentSummary } from '../../entities/exhibitComponents';

export const WEBSOCKET_REQUEST_ACTION = {
  HANDSHAKE: 'HANDSHAKE',
  SUBSCRIBE_MULTIPLE_EXHIBITS: 'SUBSCRIBE_MULTIPLE_EXHIBITS',
  SUBSCRIBE_MULTIPLE_HARDWARE: 'SUBSCRIBE_MULTIPLE_HARDWARE',
  UNSUBSCRIBE_MULTIPLE_EXHIBITS: 'UNSUBSCRIBE_MULTIPLE_EXHIBITS',
  UNSUBSCRIBE_MULTIPLE_HARDWARE: 'UNSUBSCRIBE_MULTIPLE_HARDWARE',
} as const;

export type WebsocketRequestAction = ObjectValues<
  typeof WEBSOCKET_REQUEST_ACTION
>;

export type HandshakePayload = {
  jwt: string;
};

export type SubscribeMultipleExhibitsPayload = {
  exhibits: Array<ExhibitSummary['id']>;
};

export type SubscribeMultipleHardwarePayload = {
  hardware: Array<ExhibitComponentSummary['componentId']>;
};

export type UnsubscribeMultipleExhibitsPayload = {
  exhibits: Array<ExhibitSummary['id']>;
};

export type UnsubscribeMultipleHardwarePayload = {
  hardware: Array<ExhibitComponentSummary['componentId']>;
};

export type WebsocketRequestPayloadMap = {
  HANDSHAKE: HandshakePayload;
  SUBSCRIBE_MULTIPLE_EXHIBITS: SubscribeMultipleExhibitsPayload;
  SUBSCRIBE_MULTIPLE_HARDWARE: SubscribeMultipleHardwarePayload;
  UNSUBSCRIBE_MULTIPLE_EXHIBITS: UnsubscribeMultipleExhibitsPayload;
  UNSUBSCRIBE_MULTIPLE_HARDWARE: UnsubscribeMultipleHardwarePayload;
};

interface WebsocketRequest<T extends WebsocketRequestAction> {
  action: T;
  data: WebsocketRequestPayloadMap[T];
}

export type WebsocketHandshakeRequest = WebsocketRequest<'HANDSHAKE'>;

export type WebsocketSubscribeMultipleExhibitsRequest =
  WebsocketRequest<'SUBSCRIBE_MULTIPLE_EXHIBITS'>;

export type WebsocketSubscribeMultipleHardwareRequest =
  WebsocketRequest<'SUBSCRIBE_MULTIPLE_HARDWARE'>;

export type WebsocketUnsubscribeMultipleExhibitsRequest =
  WebsocketRequest<'UNSUBSCRIBE_MULTIPLE_EXHIBITS'>;

export type WebsocketUnsubscribeMultipleHardwareRequest =
  WebsocketRequest<'UNSUBSCRIBE_MULTIPLE_HARDWARE'>;
