import React from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type CustomFieldProps = {
  control: any;
  rules?: any;
  error?: any;
} & Partial<TextFieldProps>;

function CustomField({
  name,
  control,
  rules,
  error,
  inputProps,
  ...rest
}: CustomFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name || ''}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...rest}
            {...field}
            type={showPassword ? 'text' : rest.type || 'text'}
            error={Boolean(error)}
            InputProps={{
              ...(rest.InputProps || {}),
              ...(rest.type === 'password' && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }),
            }}
          />
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

export default CustomField;
