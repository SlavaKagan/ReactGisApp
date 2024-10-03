import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import './App.css';

function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    const webMap = new WebMap({
      basemap: 'streets-navigation-vector',
    });

    const view = new MapView({
      container: mapRef.current, 
      map: webMap,
      center: [34.8516, 31.0461], // Israel coordinates
      zoom: 5,
    });

    const capitalCitiesLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0',
      definitionExpression: "STATUS = 'National and provincial capital'",
      outFields: ['CITY_NAME', 'POP'],
      popupTemplate: {
        title: '{CITY_NAME}',
        content: 'Population: {POP}',
      },
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          color: 'red',
          size: '10px',
        },
      },
    });

    webMap.add(capitalCitiesLayer);

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h1>GIS React Application</h1>
      <div id="mapContainer" ref={mapRef} style={{ height: '600px', width: '100%' }}></div>
    </div>
  );
}

export default App;
