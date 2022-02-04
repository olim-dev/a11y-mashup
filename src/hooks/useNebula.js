import { useState, useEffect } from 'react';
import nebulaPromise from 'config/nebula/nebula';

const useNebula = () => {
  const [nebula, setNebula] = useState(null);
  useEffect(() => {
    (async () => {
      const _nebula = await nebulaPromise;
      setNebula(_nebula);
    })();
  }, []);
  return nebula;
};

export default useNebula;
