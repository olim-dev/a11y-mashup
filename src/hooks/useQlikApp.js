import { useState, useEffect } from 'react';
import qlikAppPromise from 'config/qlikApp';

const useQlikApp = () => {
  const [qlikApp, setQlikApp] = useState(null);
  useEffect(() => {
    (async () => {
      const _qlikApp = await qlikAppPromise;
      setQlikApp(_qlikApp);
    })();
  }, []);
  return qlikApp;
};

export default useQlikApp;
