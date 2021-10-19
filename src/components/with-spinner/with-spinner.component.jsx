import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerContainer>
        <SpinnerOverlay />
      </SpinnerContainer>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
