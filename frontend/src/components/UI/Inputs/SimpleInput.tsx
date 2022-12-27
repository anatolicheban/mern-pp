import React from "react";
import { TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

type SimpleInputProps = {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: React.InputHTMLAttributes<unknown>["type"];
  sx?: SxProps<Theme>;
};

const SimpleInput = ({
  label,
  placeholder,
  value,
  onChange,
  multiline,
  type,
  sx,
}: SimpleInputProps) => {
  return (
    <TextField
      label={label}
      variant="filled"
      sx={
        sx || {
          maxWidth: "32rem",
          width: "100%",
        }
      }
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiline={multiline}
      type={type || "text"}
    />
  );
};

export default React.memo(SimpleInput);
