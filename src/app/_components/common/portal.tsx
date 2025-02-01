import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    // Find the portal target in the DOM
    const element = document.getElementById('portal-root');
    if (element) {
      setPortalElement(element);
    }

    // Cleanup (optional)
    return () => {
      setPortalElement(null);
    };
  }, []);

  // If the portal target exists, render the children into it
  if (portalElement) {
    return ReactDOM.createPortal(children, portalElement);
  }

  // If the portal target doesn't exist, render nothing
  return null;
};

export default Portal;
