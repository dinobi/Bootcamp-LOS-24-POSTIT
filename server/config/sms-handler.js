import Nexmo from 'nexmo';

export const nexmo = new Nexmo({
  apiKey: '2dfdba3e',
  apiSecret: 'e9e9f29fd5f77655',
});

const smsHandler = (phone, message) => {
  nexmo.message.sendSms(
    '2348032952998', phone, message,
  );
};

export default smsHandler;
