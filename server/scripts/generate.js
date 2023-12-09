const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toAffine } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

// console.log('private Key :', toHex(privateKey));
// const publicKey = secp.secp256k1.getPublicKey(privateKey);
// console.log('public Key :', toHex(publicKey));
 bytes = utf8ToBytes('hugo');
 hash = keccak256(bytes);

 signature = secp.secp256k1.sign(hash, "535e6fb65ec24c760c123635aaa0ac7eeb5e35cf71e8c9e1a790737c6776f6ec");
console.log('hugo signature :', signature);


 bytes = utf8ToBytes('charly');
 hash = keccak256(bytes);

 signature = secp.secp256k1.sign(hash, "f1a137bd6f5ed3d41c4c0450d84b029be5d1f3250f2aeda4ff20875fe79d34ef");
console.log('charly signature :', signature);


bytes = utf8ToBytes('louis');
hash = keccak256(bytes);

signature = secp.secp256k1.sign(hash, "40fac5b485b694534ddf9fa2ebb44f803cb2e3414a7834344ae4c1e34b3e9167");
console.log('louis signature :', signature);
const publictest = signature.recoverPublicKey(hash);

console.log(toHex(publictest.toRawBytes()));


bytes = utf8ToBytes('hugo');
 hash = keccak256(bytes);
 publicKey = "03e27ce20b8530550e8440620f85fdfcc0be089783230873bc4b0efef32c04c4fd";
signa = {
    r: 33857895407059260834235776725747979384155070120902905329096487983304401142520n,
    s: 24327185237230357565614201690373267336417653527626090570505327342569308629433n,
  };
const isValid = secp.secp256k1.verify(
    signa,
  hash,
  publicKey
);
console.log(isValid);


const test = 45;
const Bigtest = BigInt(test);
console.log(test,Bigtest )
