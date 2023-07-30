import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ components, isLoggedIn }) {
    return (
      isLoggedIn ? components : <Navigate to='/sign-in' />
    );
}
