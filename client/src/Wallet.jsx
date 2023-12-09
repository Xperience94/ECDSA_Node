import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ addressSender, setAddressSender, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const addressSender = evt.target.value;
    // setPrivateKey(privateKey);
    // const addressSender = toHex(secp.secp256k1.getPublicKey(privateKey));
    setAddressSender(addressSender);
    if (addressSender) {
      const {
        data: { balance },
      } = await server.get(`balance/${addressSender}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        address public key
        <input placeholder="Type your Public Key" value={addressSender} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
