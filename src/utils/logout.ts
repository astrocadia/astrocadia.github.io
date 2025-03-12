import posthog from 'posthog-js';
import { LocalStorage } from './LocalStorage';
import { type AppDispatch } from '../app/store';
import { GumbandWebsocket } from '../app/services/websocket/GumbandWebsocket';
import { removeCookie } from './cookies';
import { api } from '../app/services/api';

export const logout = async (dispatch: AppDispatch) => {
  removeCookie('dltoken');
  posthog.reset();
  // disconnect from the websocket
  LocalStorage.clear();
  GumbandWebsocket.close();
  dispatch(api.util.resetApiState());
};
