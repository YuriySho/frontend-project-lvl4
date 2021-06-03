/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  name: yup.string()
    .min(3, 'Name must be 3 characters at minimum')
    .required(),
  password: yup.string()
    .min(8, 'Password must be 8 characters at minimum')
    .required(),
});

export default () => (
  <div className="container-flued flex-grow-1">
    <div className="row justify-content-center align-content-center h-100 w-100">
      <div className="col-xl-4 col-lg-4 col-sm-4">
        <div className="card border-0 shadow-lg rounded">
          <div className="card-body d-flex flex-column justify-content-center p-5">
            <Formik
              initialValues={{ name: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={({ setSubmitting }) => {
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="d-flex flex-column">
                  <h1 className="text-center mb-4">Login</h1>
                  <label htmlFor="name">Name</label>
                  <Field
                    className={`mb-3 p-2 rounded border form-control ${
                      touched.name && errors.name ? 'is-invalid' : ''
                    }`}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="invalid-feedback"
                  />
                  <label htmlFor="password">Password</label>
                  <Field
                    className={`mb-3 p-2 rounded border form-control ${
                      touched.name && errors.name ? 'is-invalid' : ''
                    }`}
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="off"
                    required
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="invalid-feedback"
                  />
                  <button className="shadow bg-white rounded w-25 p-2 mb-3 align-self-center border" type="submit" disabled={isSubmitting}>Enter</button>
                </Form>
              )}
            </Formik>
            <div className="card-footer align-self-center border-0 bg-white">
              <div className="text-center">
                <span className="mr-1">No login?</span>
                <a href="/singup">Registration</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
