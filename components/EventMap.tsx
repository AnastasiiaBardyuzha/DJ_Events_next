import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { EventType } from 'constants_types/types';

interface Props {
  event: EventType
};

interface ViewportType {
  latitude: number,
  longitude: number,
  width: string,
  height: string,
  zoom: number,
};

 const EventMap: NextPage<Props> = ({ event }) => {

  const provider = new OpenStreetMapProvider();

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewport, setViewport] = useState<ViewportType>({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  const getCoordinates = async () => {
    try {
      const res = await provider.search({ query: event.address }); 
      console.log(res);
      
      const { x, y } = res[0];

        setLat(y);
        setLng(x);
        setViewport({
          ...viewport,
          latitude: y,
          longitude: x,
        });
        setLoading(false);

    } catch(er) {
      console.log(er);    
    }
  };

  useEffect(() => {
    getCoordinates();

  }, []);
  
  if (loading) return (
    <div className="">Loading...</div>
  );

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={
        process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN
      }
      onViewportChange={
        (vp: ViewportType) => setViewport(vp)
      }
    >
      <Marker
        key={event.id}
        latitude={lat}
        longitude={lng}
      >
        <Image
          src='/images/pin.svg'
          width={30}
          height={30}
        />
      </Marker>
    </ReactMapGl>
  );
 };

export default EventMap;