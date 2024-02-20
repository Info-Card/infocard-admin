import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CustomField from '@/components/ui/CustomField';
import { useLazyLinkTagQuery } from '@/store/tags';
import { toast } from 'react-toastify';

interface FormData {
  tagId: string;
}

const schema = yup.object().shape({
  tagId: yup.string().required(),
});

const formFields = [{ name: 'tagId', label: 'Tag Id*' }];

const LinkTagDialog = ({ onClose, user }: any) => {
  const [linkTag] = useLazyLinkTagQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await linkTag({ ...data, user }).unwrap();
      toast.success('Tag Added Successfully');
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="dialog-title"
      fullWidth
    >
      <DialogTitle id="dialog-title">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Link tag</Typography>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => onClose()}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Stack gap={1}>
            {formFields.map((field: any, i: any) => (
              <CustomField
                key={i}
                {...field}
                control={control}
                errors={errors}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Link
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LinkTagDialog;
