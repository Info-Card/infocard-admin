import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

const schema = yup.object().shape({
  tag: yup.string().max(32).required(),
});

export const AddTagModal = ({ show, setShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  useEffect(() => {
    setShow(false);
  }, [setShow]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Custom Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group controlId="tag">
            <Form.Label>Tag</Form.Label>
            <Form.Control {...register("tag")} placeholder="tag" type="text" />
            <p className="validation-color">{errors.tag?.message}</p>
          </Form.Group>
          <Button type="submit" variant="primary">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
