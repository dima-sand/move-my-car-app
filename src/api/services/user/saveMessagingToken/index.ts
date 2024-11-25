import { RestService } from '../../..';

const saveMessagingTokenService = (token: string) => {
  const res = RestService.fetch(
    '/user/saveMessagingToken',{
      method: 'POST',
      data: { token, },
    }
  );
  return res;
};

export default saveMessagingTokenService;
