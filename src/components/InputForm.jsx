import React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';

export default () => (
  <div className="border-top mt-auto py-3 px-5">
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="input-group">
            <Field
              id="message"
              name="message"
              type="text"
              placeholder="Input text..."
              className="border-0 form-control is-invalid"
            />
            <div className="input-group-append">
              <button type="submit" disabled={isSubmitting}>Enter</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
