import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ addressSender, setBalance , signatureR, setSignatureR, signatureS, setSignatureS}) {
  const [sendAmount, setSendAmount] = useState("");
  const [addresDestinataire, setAddresDestinataire] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: addressSender,
        amount: parseInt(sendAmount),
        recipient : addresDestinataire,
        signatureR : signatureR,
        signatureS : signatureS
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Address destinataire
        <input
          placeholder="Type an address, for example: 0x2"
          value={addresDestinataire}
          onChange={setValue(setAddresDestinataire)}
        ></input>
      </label>

      <label>
        SignatureR
        <input
          placeholder="Type a Signature"
          value={signatureR}
          onChange={setValue(setSignatureR)}
        ></input>
      </label>
      <label>
        SignatureS
        <input
          placeholder="Type a Signature"
          value={signatureS}
          onChange={setValue(setSignatureS)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
