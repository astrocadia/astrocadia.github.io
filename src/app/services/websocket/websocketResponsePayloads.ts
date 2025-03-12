import {
  SOCKET_EVENT_TYPE,
  type SocketEventPayloadMap,
} from '@deeplocal/gumband-public-shared-lib';
import type { ObjectValues } from '../../../utils/usefulTS';
import type { ExhibitSummary } from '../../entities/exhibit';
import type {
  Control,
  IndividualSetting,
  SettingList,
  Status,
} from '../../entities/exhibitManifest';

export const WEBSOCKET_RESPONSE_ACTION = {
  CONTROL_RECEIVED: 'CONTROL_RECEIVED',
  EXHIBIT_OFFLINE: 'EXHIBIT_OFFLINE',
  EXHIBIT_ONLINE: 'EXHIBIT_ONLINE',
  HANDSHAKE_SUCCESSFUL: 'HANDSHAKE_SUCCESSFUL',
  OP_MODE_RECEIVED: 'OP_MODE_RECEIVED',
  // SETTING_LIST_ITEM_DELETED as implemented in the BE is quickly followed by a SETTING_LIST_RECEIVED
  // therefore it is not necessary to have a separate action for it
  // SETTING_LIST_ITEM_DELETED: 'SETTING_LIST_ITEM_DELETED',
  SETTING_LIST_RECEIVED: 'SETTING_LIST_RECEIVED',
  SETTING_RECEIVED: 'SETTING_RECEIVED',
  STATUS_RECEIVED: 'STATUS_RECEIVED',
  // All of the above should be replaced with shared lib types when possible
  EXHIBIT_HEALTH_UPDATED: SOCKET_EVENT_TYPE.EXHIBIT_HEALTH_UPDATED,
  COMPONENT_CONNECTED: SOCKET_EVENT_TYPE.COMPONENT_CONNECTED,
  COMPONENT_DISCONNECTED: SOCKET_EVENT_TYPE.COMPONENT_DISCONNECTED,
  COMPONENT_PROPERTY_RECEIVED: SOCKET_EVENT_TYPE.COMPONENT_PROPERTY_RECEIVED,
} as const;

export type WebsocketResponseAction = ObjectValues<
  typeof WEBSOCKET_RESPONSE_ACTION
>;

export type ExhibitControlReceivedPayload = {
  controlId: Control['id'];
  manifestId: Control['manifestId'];
};

export type ExhibitOfflinePayload = {
  exhibitId: string; // should be a number, but is sent down as a string
  lastOnlineChange: string; // ISO 8601 timestamp
};

export type ExhibitOnlinePayload = {
  exhibitId: string; // should be a number, but is sent down as a string
  lastOnlineChange: string; // ISO 8601 timestamp
};

export type ExhibitSettingListReceivedPayload = {
  id: SettingList['manifestId']; // Yep, that's right, no exhibitId, only the item's manifestId
  value: unknown; // There is data here, but it's not complete enough to provide a way to update anything
};

export type ExhibitSettingReceivedPayload = {
  id: ExhibitSummary['id'];
  manifestId: IndividualSetting['manifestId'];
  settingId: IndividualSetting['id'];
  settingValue: IndividualSetting['value'];
};

export type ExhibitStatusReceivedPayload = Status;

export type HandshakeSuccessfulPayload = undefined;

export type ExhibitOpModeReceivedPayload = {
  id: ExhibitSummary['id'];
  mode: boolean;
};

export type WebsocketResponsePayloadMap = {
  CONTROL_RECEIVED: ExhibitControlReceivedPayload;
  EXHIBIT_OFFLINE: ExhibitOfflinePayload;
  EXHIBIT_ONLINE: ExhibitOnlinePayload;
  HANDSHAKE_SUCCESSFUL: HandshakeSuccessfulPayload;
  SETTING_LIST_RECEIVED: ExhibitSettingListReceivedPayload;
  SETTING_RECEIVED: ExhibitSettingReceivedPayload;
  STATUS_RECEIVED: ExhibitStatusReceivedPayload;
  OP_MODE_RECEIVED: ExhibitOpModeReceivedPayload;
  EXHIBIT_HEALTH_UPDATED: SocketEventPayloadMap['EXHIBIT_HEALTH_UPDATED'];
  COMPONENT_CONNECTED: SocketEventPayloadMap['COMPONENT_CONNECTED'];
  COMPONENT_DISCONNECTED: SocketEventPayloadMap['COMPONENT_DISCONNECTED'];
  COMPONENT_PROPERTY_RECEIVED: SocketEventPayloadMap['COMPONENT_PROPERTY_RECEIVED'];
};

interface WebsocketResponse<T extends WebsocketResponseAction> {
  action: T;
  data: WebsocketResponsePayloadMap[T];
}

export const isWebsocketResponse = <T extends WebsocketResponseAction>(
  response: unknown,
  action: T
): response is WebsocketResponse<T> =>
  typeof response === 'object' &&
  response !== null &&
  'action' in response &&
  response.action === action;

// Probably not useful as it doesn't include the exhibitId, so it's impossible to tell
// which exhibit this control is for when the app is subscribed to multiple exhibits
export type WebsocketExhibitControlReceivedResponse =
  WebsocketResponse<'CONTROL_RECEIVED'>;

export type WebsocketExhibitOfflineResponse =
  WebsocketResponse<'EXHIBIT_OFFLINE'>;

export type WebsocketExhibitOnlineResponse =
  WebsocketResponse<'EXHIBIT_ONLINE'>;

export type WebsocketExhibitSettingListReceivedResponse =
  WebsocketResponse<'SETTING_LIST_RECEIVED'>;

export type WebsocketExhibitSettingReceivedResponse =
  WebsocketResponse<'SETTING_RECEIVED'>;

export type WebsocketExhibitStatusReceivedResponse =
  WebsocketResponse<'STATUS_RECEIVED'>;

export type WebsocketHandshakeSuccessfulResponse =
  WebsocketResponse<'HANDSHAKE_SUCCESSFUL'>;

export type WebsocketOpModeReceivedResponse =
  WebsocketResponse<'OP_MODE_RECEIVED'>;

export type WebsocketExhibitHealthUpdatedResponse =
  WebsocketResponse<'EXHIBIT_HEALTH_UPDATED'>;

export type WebsocketComponentConnectedResponse =
  WebsocketResponse<'COMPONENT_CONNECTED'>;

export type WebsocketComponentDisconnectedResponse =
  WebsocketResponse<'COMPONENT_DISCONNECTED'>;

export type WebsocketComponentPropertyReceivedResponse =
  WebsocketResponse<'COMPONENT_PROPERTY_RECEIVED'>;
