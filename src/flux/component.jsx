import React from 'react';
import PropTypes from 'prop-types';


export default function (Component) {
  const FluxComponent = (props, context) => {
    const {store, router} = context;
    const fluxProps = {
      store,
      router,
    };
    if (props.fluxRef) {
      fluxProps.ref = props.fluxRef;
    }
    return <Component {...props} {...fluxProps} />;
  }
  FluxComponent.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object,
  };
  return FluxComponent;
};

