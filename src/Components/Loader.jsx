import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="folder">
          <div className="top" />
          <div className="bottom" />
        </div>
        <div className="title">getting files ready...</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: fit-content;
    gap: 10px
  }

  .folder {
    width: min-content;
    margin: auto;
    animation: float 2s infinite linear;
  }

  .folder .top {
    background-color: #FF8F56;
    width: 60px;
    height: 12px;
    border-top-right-radius: 10px;
  }

  .folder .bottom {
    background-color: #FFCE63;
    width: 100px;
    height: 70px;
    box-shadow: 5px 5px 0 0 #283149;
    border-top-right-radius: 8px;
  }

  .container .title {
    font-size: .9em;
    color: #283149;
    text-align: center;
    margin-top: 15px;
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }

    50% {
      transform: translatey(-25px);
    }

    100% {
      transform: translatey(0px);
    }
  }`;

export default Loader;
