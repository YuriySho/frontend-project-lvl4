import React, { useContext, useRef, useEffect } from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { Context } from '../contexts';

const inputSchema = yup.object().shape({
  message: yup.string().trim()
    .max(400)
    .min(1)
    .required('errors.required'),
});

export default () => {
  const { socket, token } = useContext(Context);
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="border-top mt-auto py-3 px-5">
      <Formik
        initialValues={{ message: '' }}
        validationSchema={inputSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(false);
          const message = {
            body: values.message,
            channelId: currentChannelId,
            username: token.username,
          };
          socket.volatile.emit('newMessage', message, ({ status }) => {
            if (status === 'ok') {
              setSubmitting(true);
              resetForm();
              inputRef.current.focus();
            }
          });
        }}
      >
        {({ isSubmitting, errors, values }) => (
          <Form>
            <div className="input-group">
              <Field
                id="message"
                name="message"
                type="text"
                placeholder="Input text..."
                autoComplete="off"
                className="border-0 form-control mx-2"
                innerRef={inputRef}
              />
              <div className="input-group-append">
                <button className="border-0 bg-white" type="submit" disabled={isSubmitting || !!errors.message || !values.message}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-arrow-up-square"
                    viewBox="0 0 16 16"
                  >
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                  </svg>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
