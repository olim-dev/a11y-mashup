import { useRef, useState, useEffect } from 'react';
import equal from 'deep-equal';
import merge from 'utils/merge';

const defaultHyperCubeDef = {
  qDimensions: [],
  qMeasures: [],
  qInitialDataFetch: [{
    qTop: 0,
    qLeft: 0,
    qWidth: 10,
    qHeight: 1000,
  }],
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  qInterColumnSortOrder: [],
  qSuppressZero: true,
  qSuppressMissing: true,
};

const defaultListObjectDef = {
  qDef: {
    qSortCriterias: [{
      qSortByState: 0,
    }],
  },
  qInitialDataFetch: [{
    qTop: 0,
    qWidth: 1,
    qHeight: 10000,
  }],
  qSortByAscii: 1,
  qSortByLoadOrder: 1,
  qInterColumnSortOrder: [],
  qSuppressZero: true,
  qSuppressMissing: true,
};

const useQlikSessionObject = ({ app, properties: propertiesProp, onLayoutChange }) => {
  const properties = { ...propertiesProp };
  properties.qInfo = { qType: 'session-object' };
  if (properties.qHyperCubeDef) {
    properties.qHyperCubeDef = merge(defaultHyperCubeDef, properties.qHyperCubeDef);
  }
  if (properties.qListObjectDef) {
    properties.qListObjectDef = merge(defaultListObjectDef, properties.qListObjectDef);
  }
  const staleProperties = useRef();
  const qProp = useRef();
  qProp.current = properties;

  const modelRef = useRef(null);
  const [model, setModel] = useState(null);
  const [layout, setLayout] = useState(null);
  const onLayoutChangeRef = useRef(onLayoutChange);
  useEffect(() => {
    onLayoutChangeRef.current = onLayoutChange;
  }, [onLayoutChange]);

  useEffect(() => {
    if (!app) return undefined;
    (async () => {
      modelRef.current = await app.createSessionObject(qProp.current);
      setModel(modelRef.current);
      modelRef.current.on('changed', async () => {
        const _layout = await modelRef.current.getLayout();
        setLayout(_layout);
        if (onLayoutChangeRef.current) {
          onLayoutChangeRef.current({ layout: _layout });
        }
      });
      modelRef.current.setProperties(qProp.current);
    })();
    return () => {
      if (modelRef.current) {
        app.destroySessionObject(modelRef.current.id);
      }
    };
  }, [app]);

  if (modelRef.current && !equal(staleProperties.current, properties)) {
    (async () => {
      await modelRef.current.setProperties(qProp.current);
    })();
  }
  staleProperties.current = properties;

  return { model, layout };
};

export default useQlikSessionObject;
