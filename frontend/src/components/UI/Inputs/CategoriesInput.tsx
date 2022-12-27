import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

type CategoriesInputProps = {
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
};

const CategoriesInput = ({ value, options, onChange }: CategoriesInputProps) => {
  return (
    <Autocomplete
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      multiple
      options={options}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="Категорії"
          placeholder="Обрати категорію"
          sx={{
            maxWidth: "48rem",
          }}
        />
      )}
    />
  );
};

export default React.memo(CategoriesInput);
