import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spinner.scss';

const Spinner = ({}) => {
  return (
    <div className="app-spinner">
      <FontAwesomeIcon icon="spinner" spin size="lg"></FontAwesomeIcon>
    </div>
  );
};

export default Spinner;
