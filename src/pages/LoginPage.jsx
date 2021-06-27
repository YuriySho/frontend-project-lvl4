/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import routes from '../routes';
import { AuthContext } from '../contexts';

const loginSchema = yup.object().shape({
  username: yup.string()
    .required(),
  password: yup.string()
    .required(),
});

export default () => {
  const history = useHistory();
  const { isAutheticated } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const redirectAuthorized = useCallback(
    () => {
      if (isAutheticated) {
        history.replace('/');
      }
    },
    [isAutheticated, history],
  );

  useEffect(() => {
    redirectAuthorized();
  }, [redirectAuthorized]);

  return (
    <div className="container-flued flex-grow-1">
      <div className="row justify-content-center align-content-center h-100 w-100">
        <div className="col-xl-4 col-lg-4 col-sm-4">
          <div className="card border-0 shadow-lg rounded">
            <div className="card-body d-flex flex-column justify-content-center p-5">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const res = await axios.post(routes.loginPath(), { ...values });
                    setError(null);
                    setSubmitting(false);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    history.push('/');
                  } catch (e) {
                    setError('Incorrect username or password');
                    setSubmitting(false);
                    if (e.response.status === 401) {
                      setError('Wrong username or password');
                    }
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="d-flex flex-column">
                    <h1 className="text-center mb-4">Login</h1>
                    <label htmlFor="username">Name</label>
                    <Field
                      className={`mb-3 mt-1 p-2 rounded border form-control ${
                        error ? 'is-invalid' : ''
                      }`}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      required
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                      className={`mb-3 mt-1 p-2 rounded border form-control ${
                        error ? 'is-invalid' : ''
                      }`}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      required
                    />
                    {error && (
                      <div className="invalid-feedback">
                        {error}
                      </div>
                    )}
                    <button className="shadow bg-white rounded w-25 p-2 mb-3 align-self-center border" type="submit" disabled={isSubmitting}>Enter</button>
                  </Form>
                )}
              </Formik>
              <div className="card-footer align-self-center border-0 bg-white">
                <div className="text-center">
                  <span className="mr-1">No login?</span>
                  <Link to="/singup">Registration</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
