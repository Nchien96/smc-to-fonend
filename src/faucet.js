/* eslint-disable no-unused-vars */
import React from "react";

import { Web3 } from "web3";

import "../node_modules/bulma/css/bulma.min.css";

const Faucet = () => {
  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="balance-view is-size-2">
          Current Balance: <strong>10 ETH</strong>
        </div>
        <button className="button is-primary mr-5">Donate</button>
        <button className="button is-danger mr-5">Withdraw</button>
        <button className="button is-warning">ConnectMetamask</button>
      </div>
    </div>
  );
};

export default Faucet;
