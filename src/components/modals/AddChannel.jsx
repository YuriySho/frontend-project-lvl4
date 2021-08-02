import React, { useContext, useEffect, useRef } from 'react';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Context } from '../../contexts';

const channelSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .min(3)
    .max(20)
    .required(),
});

export default () => {
  const {
    socket,
    show,
    handleClose,
  } = useContext(Context);

  const nameRef = useRef();

  useEffect(() => nameRef.current && nameRef.current.focus());

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      setSubmitting(true);
      const channel = { name };
      socket.volatile.emit('newChannel', channel, ({ status }) => {
        if (status === 'ok') {
          handleClose();
        }
      });
    },

  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header>
        <Modal.Title>Add Channel</Modal.Title>
        <button onClick={handleClose} aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              type="text"
              onChange={formik.handleChange}
              isInvalid={formik.errors.name}
              ref={nameRef}
            />
            {formik.errors.name
            && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              type="submit"
              onClick={handleClose}
              disabled={formik.isSubmitting}
            >
              Cansel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
