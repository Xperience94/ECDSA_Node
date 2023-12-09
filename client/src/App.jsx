import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [addressSender, setAddressSender] = useState("");
  //const [privateKey, setPrivateKey] = useState("");
  const [signatureR, setSignatureR] = useState("");
  const [signatureS, setSignatureS] = useState("");


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        addressSender={addressSender}
        setAddressSender={setAddressSender}
      />
      <Transfer setBalance={setBalance} 
                addressSender={addressSender} 
                signatureR={signatureR} 
                setSignatureR={setSignatureR}
                signatureS={signatureS} 
                setSignatureS={setSignatureS}/>
    </div>
  );
}

export default App;
