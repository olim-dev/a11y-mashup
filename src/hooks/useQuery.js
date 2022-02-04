/* eslint-disable import/no-anonymous-default-export */
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
    const location = useLocation();
    const query = useMemo(() => new URLSearchParams(location.search), [location]);
    return query;
};