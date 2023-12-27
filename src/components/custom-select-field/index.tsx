import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller } from 'react-hook-form';

type CustomSelectFieldProps = {
  label: string;
  name: string;
  control: any;
  error?: any;
  options: any[];
  disabled?: any;
};

function CustomSelectField({
  label,
  name,
  control,
  error,
  options,
  ...rest
}: CustomSelectFieldProps) {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel variant="filled" id="demo-simple-select-label">
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select variant="filled" label={label} {...field} {...rest}>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && (
        <FormHelperText sx={{ color: 'error.main' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomSelectField;
