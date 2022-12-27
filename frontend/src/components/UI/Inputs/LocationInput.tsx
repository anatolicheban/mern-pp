import React from "react";
import { Autocomplete, TextField } from "@mui/material";

type LocationInputProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const LocationInput = ({ options, value, onChange }: LocationInputProps) => {
  return (
    <Autocomplete
      noOptionsText="Область не знайдено"
      disablePortal
      options={options}
      value={value}
      onChange={(e, newValue) => {
        onChange(newValue as string);
      }}
      sx={{
        maxWidth: "32rem",
        width: "100%",
      }}
      renderInput={(params) => (
        <TextField
          variant="filled"
          type={"text"}
          {...params}
          label="Область"
          placeholder="Вкажіть область вашого нас. пункту"
        />
      )}
    />
  );
};

export default LocationInput;
