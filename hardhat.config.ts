import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'

//Configure dotenv
dotenv.config({ path: '.env' })

const QUICKNODE_HTTP_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
    }
  },

  networks: {
    sepolia: {
      url: QUICKNODE_HTTP_URL,
      accounts: [ PRIVATE_KEY! ]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

export default config;
