const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  // create a merkle tree for the whole nicelist
  const merkleTree = new MerkleTree(niceList);
  // get the merkle root
  const merkleRoot = merkleTree.getRoot();
  // pass a name
  const name = "Norman ";
  // find the index of the name
  const index = niceList.findIndex((n) => n === name);
  // get the proof of the index
  const proof = merkleTree.getProof(index);
  console.log(merkleRoot);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // pass name and proof to server
    gift: name,
    proof,
  });

  console.log({ gift });
}

main();
