import { StreamVideoClient } from '@stream-io/video-react-sdk';

const apiKey = 'svmwccdgb9z';

export const createStreamClient = async (userId) => {
  console.log(userId)
  const res = await fetch(`http://localhost:5000/api/listenify/token/${userId}`, {
    
    credentials: 'include', // if cookies are used
  });

  // console.log(await res.json())

  const { message } = await res.json();

  console.log(message)
  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user: {
      id: userId,
    
    },
    token: message,
  });

  return client;
};
