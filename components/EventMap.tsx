import { NextPage } from 'next';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';
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

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '');

  if (loading) return (
    <div className="">Loading...</div>
  )


  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(event.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        setLat(lat)
        setLng(lng)
        setViewport({ ...viewport, latitude: lat, longitude: lng })
        setLoading(false)
      },
      (error) => {
        console.error(error)
      }
    )
  }, [])

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