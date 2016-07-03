import window from '../window-imitate.js';

const Config = {
  guest: window.__USER_GUEST__ === 'true',
  admin: window.__USER_ADMIN__ === 'true',
  websocket_url: window.__WEBSOCKET_URL__,
  room_name: window.__ROOM_NAME__,
  features: {
    suggestedRooms: false,
    useFlairStyle: () => {
      // We can switch here based on subreddit
      return false;
    }
  },
  environment: {
    prod: window.__ENVIRONMENT__ === 'production'
  },
  settings: {
    ping_timeout: 20000,  // 20 seconds
    max_stale_state_millis: 1000 * 60 * 2, // 2 minutes
    message_split_millis: 1000 * 60 * 10,  // 10 minutes
    notification_timeout: 5000,
    default_banner: 'Message from the moderators to you, the user.',
    dev_tools: window.__ENVIRONMENT__ !== 'production',
    flairScaleForRoom: (room) => {
      if (room.get('flairScale') === '0.25') {
        return 'flair-scale-one-quarter';
      } else if (room.get('flairScale') === '0.5') {
        return 'flair-scale-half';
      } else if (room.get('flairScale') === '0.75') {
        return 'flair-scale-three-quarter';
      }

      return '';
    }
  },
  styles: {
    getSidebarColorForRoom(room) {
      if (room.getIn(['styles', 'sidebarBackgroundColor'])) {
        return {
          backgroundColor: room.getIn(['styles', 'sidebarBackgroundColor']),
          color: room.getIn(['styles', 'sidebarTextColor'])
        };
      }

      return {};
    }
  }
};

export default Config;
