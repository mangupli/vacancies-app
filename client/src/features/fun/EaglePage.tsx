import React, { useEffect, useState } from 'react';
import type { ProcessEnv } from '../../types/types';

export default function EaglePage(): JSX.Element {
  const env: ProcessEnv = {
    VITE_API_KEY: import.meta.env.VITE_API_KEY as string,
  };

  const url = `https://api.giphy.com/v1/gifs/random?api_key=${env.VITE_API_KEY}&tag=eagle`;

  const [gif, setGif] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((responseObj) => {
        setGif(responseObj.data.embed_url);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-2">
        {loading && <p className="font-bold">Орёл подгружается....</p>}
        {gif && (
          <iframe
            src={gif}
            width="480"
            height="270"
            // class="giphy-embed"
            allowFullScreen
            title="gif"
          />
        )}
      </div>
    </div>
  );
}
