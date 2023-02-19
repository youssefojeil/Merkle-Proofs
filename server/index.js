const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  //console.log(body);

  // get the name, and proof from the request body
  const gift = body.gift;
  const proof = body.proof;

  // TODO: prove that a name is in the list
  // use the name, proof & root to verify if the name is in the list
  const isInTheList = verifyProof(proof, gift, MERKLE_ROOT);
  console.log(isInTheList);
  // const isInTheList = false;
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
