import { formatRelative } from "date-fns";
import API_KEY from "../../key.js";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React from "react";
import mapStyles from "../../mapStyles.js";
import styled from "styled-components";
import useOnclickOutside from "react-cool-onclickoutside";
import regeneratorRuntime from "regenerator-runtime";
import Locate from './map-locate-me.jsx';
import Search from './map-search.jsx';


let MapContainer = styled.div`

`

let StyledH1 = styled.h1`
  position: absolute;
  z-index: 10;
  font-family: Helvetica;
  color: seagreen;
  margin-left: 30px;
`;


// background-color: white;
// width: 100%;
// padding-left: 50px;
// padding-top: 5px;
// padding-bottom: 10px;
// border-bottom: solid 1px;
// margin-top: -1px;

let StyledSearch = styled.div`
  position: absolute;
  top: 155px;
  left: 50%;
  transform: translateX(-30%);
  width: 100%;
  max-width: 500px;
  z-index: 10;
`;

// let StyledBox = styled.Combobox`
//   width: 100%;

// `;

let StyledButton = styled.button`
  position: absolute;
  top: 35px;
  left: 100%;
  transform: translateX(-120%);
  width: 100%;
  max-width: 90px;
  z-index: 10;
  font-family: Helvetica;
  color: seagreen;
  font-size: large;
  font-weight: bold;
  border-radius: 5px;
  border: solid 1px Gainsboro;
  padding-bottom: 3px;
`;

let StyledButton2 = styled.button`
  position: absolute;
  top: 35px;
  left: 100%;
  transform: translateX(-230%);
  width: 100%;
  max-width: 90px;
  z-index: 10;
  font-family: Helvetica;
  color: seagreen;
  font-size: large;
  font-weight: bold;
  border-radius: 5px;
  border: solid 1px Gainsboro;
  padding-bottom: 3px;
`;

let StyledButton3 = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 10%;
  max-width: 90px;
  z-index: 10;
  padding-bottom: 3px;
  border: none;
  background-color: transparent;
`;

// Map option
const containerStyle = {
  width: "100vw",
  height: "100vh",
};
// Map option
const center = {
  lat: 33.448376,
  lng: -112.074036,
};
// Map option
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// Variable reference for google places library/API
const libraries = ["places"];

function App() {

  // Hook sets initial map state to null
  const [map, setMap] = React.useState(null);

  // Creates initial map ref
  const mapRef = React.useRef();

  // Update map ref to current map
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Panning function update location of map window
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // Hooks for markers & selected states
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  return (



  //{/* ========================================== */}
  //{/* LOAD MAPS AND OTHER GOOGLE API'S HERE      */}
  //{/* ========================================== */}
    <LoadScript googleMapsApiKey={`${API_KEY}`} libraries={libraries}>
      <MapContainer>
        <StyledH1>

          {" "}
          {/* <span role='img' aria-label="evergreen_tree">
          🌵
        </span> */}
        </StyledH1>

        {/* ========================================== */}
        {/* Locate and Search Import functions         */}
        {/* ========================================== */}
        <Locate panTo={panTo} />
        <Search panTo={panTo} />


        {/* ========================================== */}
        {/* Map & Options - OnClick SetMarker Function */}
        {/* ========================================== */}
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          libraries={libraries}
          options={options}
          onLoad={onMapLoad}
          onClick={(event) => {
            setMarkers((current) => [
              ...current,
              {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
              },
            ]);
          }}>

          {/* ========================================== */}
          {/* Updates markers hook array w/ marker info  */}
          {/* ========================================== */}
          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url:
                  "https://fecproductiondescription.s3-us-west-1.amazonaws.com/trash1.png",
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}


          {/* ========================================== */}
          {/* Create pop up window for selected marker   */}
          {/* ========================================== */}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Litter Spotted!</h2>
                <p>Spotted {formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) : null}

          {/* ========================================== */}
          {/* END OF - Create pop up window for selected */}
          {/* ========================================== */}

        </GoogleMap>
      </MapContainer>
    </LoadScript>
  );
}

export default React.memo(App);
