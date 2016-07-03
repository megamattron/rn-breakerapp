import API from '../../api';

import * as actions from '../constants/menu-constants';


export function sidebarOpen() {
  return { type: actions.UI_SIDEBAR_OPEN };
}

export function sidebarClose() {
  return { type: actions.UI_SIDEBAR_CLOSE };
}

function settingsOpen() {
  return { type: actions.UI_SETTINGS_OPEN };
}

function settingsClose() {
  return { type: actions.UI_SETTINGS_CLOSE };
}

export function handleCloseAllMenus() {
  return dispatch => {
    dispatch(sidebarClose());
    dispatch(settingsClose());
  };
}

function leaveRoom(newActiveRoom) {
  return { type: actions.ROOM_LEAVE, newActiveRoom };
}

export function handleLeaveRoom(roomName) {
  return (dispatch) => {
    API.leaveRoom(roomName).then(() => {
      dispatch(leaveRoom(roomName));
    }).catch((e) => {
      console.error('[menu-actions::handleLeaveRoom]', 'Failed to leave room', e);  // eslint-disable-line
    });
  };
}

export function toggleSidebar() {
  return (dispatch, getState) => {
    if (getState().getIn(['ui', 'sidebar_open'], false)) {
      return dispatch(handleCloseAllMenus());
    }
    return dispatch(sidebarOpen());
  };
}

export function toggleSettings() {
  return (dispatch, getState) => {
    if (getState().getIn(['ui', 'settings_open'], false)) {
      return dispatch(settingsClose());
    }
    return dispatch(settingsOpen());
  };
}
