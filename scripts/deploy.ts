import { ethers } from "hardhat";
import hre from 'hardhat'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the Token Contract
  const tokenContract = await ethers.deployContract("Token");
  await tokenContract.waitForDeployment();
  console.log("Token deployed to:", tokenContract.target);

  // Deploy the Exchange Contract
  const exchangeContract = await ethers.deployContract("Exchange", [
    tokenContract.target,
  ]);
  await exchangeContract.waitForDeployment();
  console.log("Exchange deployed to:", exchangeContract.target);

  // Wait for 30 seconds to let Etherscan catch up on contract deployments
  await sleep(30 * 1000);

  // Verify the contracts on Etherscan
  await hre.run("verify:verify", {
    address: tokenContract.target,
    constructorArguments: [],
    contract: "contracts/Token.sol:Token",
  });

  await hre.run("verify:verify", {
    address: exchangeContract.target,
    constructorArguments: [tokenContract.target],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.ts --network sepolia
// Token deployed to: 0x97268b2D9f59b7b57B2af19F54f7EC7344e29644
// Exchange deployed to: 0x1766A56a9348Aa4Ee2fC42Dc11361eE28cAdb212
// Contracts was verified on sepolia network
