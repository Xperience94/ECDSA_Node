const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03e27ce20b8530550e8440620f85fdfcc0be089783230873bc4b0efef32c04c4fd": 100, // Hugo
  "02866159a9b385950df7247a50efefe8d7e71d41c3f240a44539404b071f9c633a": 50, // Charly
  "026f3314f1590a56363c1c7f67eb3de3b37f7b3cc48783f101233d3272719e2734": 75, // Louis
};

const Assiciation_Blances = {
  "03e27ce20b8530550e8440620f85fdfcc0be089783230873bc4b0efef32c04c4fd": "hugo", // Hugo
  "02866159a9b385950df7247a50efefe8d7e71d41c3f240a44539404b071f9c633a": "charly", // Charly
  "026f3314f1590a56363c1c7f67eb3de3b37f7b3cc48783f101233d3272719e2734": "louis", // Louis
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signatureR,  signatureS} = req.body;

  // Verification Signature
  bytes = utf8ToBytes(Assiciation_Blances[sender]);
  hash = keccak256(bytes);
  publicKey = sender;
 signa = {
     r: BigInt(signatureR),
     s: BigInt(signatureS),
   };
  const isValid = secp.secp256k1.verify(signa,hash,publicKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);
  //console.log(isValid);
  if(isValid){
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
   }
   else{
    res.status(400).send({ message: "Problem Signature !" });
   }
 
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
