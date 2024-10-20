const { Web3 } = require("web3");

const getFaucet = async () => {
  const web3 = new Web3("rpc");

  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
