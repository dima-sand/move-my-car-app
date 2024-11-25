import { RestService } from '../../..';

const sendMessageService = (data: {
  title: string;
  body: string;
  token: string;
}) => {
  const res = RestService.fetch(
    '/user/sendMessageToClient', {
      method: 'POST',
      data,
    }
  );
  return res;
};

export default sendMessageService;
