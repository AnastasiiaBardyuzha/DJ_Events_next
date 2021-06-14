import { NextPage } from 'next';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';
import { EventType } from 'constants_types/types';
// import
import { OpenStreetMapProvider } from 'leaflet-geosearch';

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

  // setup
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

  const results = async () => {
    try {
      const res = await provider.search({ query: event.address });
      const { x, y } = res[0]
        console.log('lat: ', y);
        console.log('lng: ', x);
        
        setLat(y)
        setLng(x)
        setViewport({ ...viewport, latitude: y, longitude: y })
        setLoading(false)
    } catch(er) {
      console.log(er);    
    }
  }

  useEffect(() => {results()}, []);
  

  if (loading) return (
    <div className="">Loading...</div>
  );

  console.log(lat, lng);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp: ViewportType) => setViewport(vp)}
    >
      <Marker key={event.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </ReactMapGl>
  )
 };

export default EventMap;