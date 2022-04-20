const path = require("path");
require('dotenv').config({ path: './.env'});

const ABCToken = artifacts.require("./ABCToken.sol");
const MyTokenSale = artifacts.require("./MyTokenSale.sol");

const INITIAL_TOKEN = process.env.INITIAL_TOKEN;
const FRACTION_SALE = process.env.FRACTION_SALE;
const SALE_RATE = process.env.SALE_RATE;

module.exports = async function(deployer) {
  const addr = await web3.eth.getAccounts();

  await deployer.deploy(ABCToken, INITIAL_TOKEN);

  await deployer.deploy(MyTokenSale, SALE_RATE, addr[0], ABCToken.address);
  
  // transfer tokens for sale to the hub
  const instance = await ABCToken.deployed();
  const tokens_for_sale = INITIAL_TOKEN * FRACTION_SALE;
  await instance.transfer(MyTokenSale.address, tokens_for_sale);
};
