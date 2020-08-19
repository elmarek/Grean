import React from 'react';
import styled from "styled-components";
import usePlacesAutocomplete from "use-places-autocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


let StyledSearch = styled.div`
  position: absolute;
  top: 175px;
  left: 50%;
  transform: translateX(-30%);
  width: 100%;
  max-width: 500px;
  z-index: 10;
`;

let StyledLi = styled.ul`
  font-family: Helvetica;
  font-size: 18px;
  list-style: none;
  padding-inline-start: 5px;
`;

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
      <Combobox
        onSelect={async (address) => {
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            console.log(lat, lng);
            panTo({ lat, lng });
            console.log(lat, lng);
          } catch (error) {
            console.log("ERROR ON SELECT");
          }
          console.log(address);
        }}
      >
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

export default Search