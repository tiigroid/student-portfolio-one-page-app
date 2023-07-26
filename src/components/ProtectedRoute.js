import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ components, isLoggedIn }) {
    return (
      <Route>
        { isLoggedIn ? components : <Redirect to='/student-portfolio-one-page-app/sign-in' /> }
      </Route>
    );
}
