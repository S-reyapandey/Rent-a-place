import { Box } from "@mui/material";
import React from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useValue } from "../../../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoCoder from "./GeoCoder";

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          osition="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <GeoCoder/>
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
