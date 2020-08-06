import { formatRelative } from "date-fns";
import API_KEY from "../../key.js";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import React from "react";
import mapStyles from "../../mapStyles.js";
import styled from "styled-components";
import useOnclickOutside from "react-cool-onclickoutside";
import regeneratorRuntime from "regenerator-runtime";

const MAPS_KEY = process.env.MAPS_API

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

let StyledLi = styled.ul`
  font-family: Helvetica;
  font-size: 18px;
  list-style: none;
  padding-inline-start: 5px;
`;

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 33.448376,
  lng: -112.074036,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

function App() {
  const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
console.log(process.env.MAP_API)
  return (
    <LoadScript googleMapsApiKey={`${API_KEY}`} libraries={libraries}>
      <MapContainer>
        <StyledH1>
          {" "}
          {/* <span role='img' aria-label="evergreen_tree">
          🌵
        </span> */}
        </StyledH1>

        <Locate panTo={panTo} />
        <Search panTo={panTo} />

        {/* <StyledButton name="button">Sign-up</StyledButton>
        <StyledButton2 name="button">Login</StyledButton2> */}
        <GoogleMap
          id="map"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          // onUnmount={onUnmount}
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
          }}
        >
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
        </GoogleMap>
      </MapContainer>
    </LoadScript>
  );
}

function Locate({ panTo }) {
  return (
    <StyledButton3
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="https://fecproductiondescription.s3-us-west-1.amazonaws.com/locateIcon.png" alt="compass" />
    </StyledButton3>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestion,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 33.448376, lng: () => -112.074036 },
      radius: 200 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // const handleSelect =  (address) => {
  //   // When user selects a place, we can replace the keyword without request data from API
  //   // by setting the second parameter to "false"
  //   setValue(description, false);

  //   Get latitude and longitude via utility functions
  //   try {
  //     const results = await getGeocode({ address });
  //     const { lat, lng } = await getLatLng(results[0]);
  //     panTo({ lat, lng });
  //   } catch (error) {
  //     console.log("😱 Error: ", error);
  //   }
  // };

  return (
    <StyledSearch>
      <Combobox onSelect={ async (address) => {
        try{
          const result = await getGeocode({address})
          const {lat, lng} = await getLatLng(result[0])
          console.log(lat, lng)
          panTo({lat, lng})
          console.log(lat, lng)
        } catch(error) {
          console.log('ERROR ON SELECT')
        }
        console.log(address);
      }}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          style={{ width: 300, height: 30 }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Enter Zip-Code, City, State..."
        />
        <ComboboxPopover>
          <StyledLi>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </StyledLi>
        </ComboboxPopover>
      </Combobox>
    </StyledSearch>
  );
}

export default React.memo(App);
