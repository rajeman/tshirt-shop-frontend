import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="text-center">
      <img
        className="not-found-image mt-5"
        src="https://cdn.dribbble.com/users/237895/screenshots/6133106/shot.jpg"
        alt="resource not found"
      />
      <div className="mt-2">
        <Link to="/">
          <span>Go to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
