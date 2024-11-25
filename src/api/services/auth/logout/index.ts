import { RestService } from '../../..';

const logoutService = () =>
  RestService.fetch('/auth/logout', {
    method: 'POST',
  });

export default logoutService;
