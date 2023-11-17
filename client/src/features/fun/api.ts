/* eslint-disable import/prefer-default-export */
import type { ProcessEnv } from '../../types/types';

export const loadGif = async (): Promise<string> => {
  const env: ProcessEnv = {
    VITE_API_KEY: import.meta.env.VITE_API_KEY as string,
  };

  const url = `https://api.giphy.com/v1/gifs/random?api_key=${env.VITE_API_KEY}&tag=puppy`;

  const response = await fetch(url);
  if (response.ok) {
    const dataObj = await response.json();
    const address: string = dataObj.data.embed_url;
    return address;
  } 
  throw new Error('Ошибка при запросе к https://api.giphy.com');
  
};


