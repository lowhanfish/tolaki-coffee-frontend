"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function GoogleMap() {
    const position = {
        lat: -4.0435,
        lng: 122.5264,
    };

    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
            <div className="h-50 w-full">
                <Map
                    defaultCenter={position}
                    defaultZoom={15}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                >
                    <Marker position={position} />
                </Map>
            </div>
        </APIProvider>
    );
}