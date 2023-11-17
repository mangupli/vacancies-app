import React, { useEffect, useState } from 'react';

import * as api from './api';

export default function GifPage(): JSX.Element {
  const [gif, setGif] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .loadGif()
      .then((url) => {
        setGif(url);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-2">
        {loading && <p className="font-bold">Gif is loading...</p>}
        {gif && (
          <iframe
            src={gif}
            width="480"
            height="270"
            allowFullScreen
            title="gif"
          />
        )}
      </div>
    </div>
  );
}
