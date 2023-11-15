import React from 'react';
import {
  FormControl,
  FormHelperText,
  TextFieldProps,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';

type CustomCheckboxProps = {
  label?: string;
  name?: string;
  control: any;
  error?: any;
};

function CustomCheckbox({
  label,
  name,
  control,
  error,
}: CustomCheckboxProps) {
  return (
    <FormControlLabel
      label={label}
      sx={{ mb: 4 }}
      control={
        <Controller
          name={name || ''}
          control={control}
          render={({ field }) => (
            <Checkbox
              onChange={(e: any) => field.onChange(e.target.checked)}
              checked={Boolean(field.value)}
            />
          )}
        />
      }
    />
  );
}

export default CustomCheckbox;
