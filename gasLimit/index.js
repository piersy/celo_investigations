import { ethers } from "ethers";

const gasLimitAbi = [`event BlockGasLimitSet(uint256 limit)`]

// const blockchainParametersProxy = "0x6E10a8864C65434A721d82e424d727326F9d5Bfa"; // mainnet
// const blockchainParametersProxy = "0xE5aCbb07b4Eed078e39D50F66bF0c80cF1b93abe"; // alfajores
// const blockchainParametersProxy = "0xE5aCbb07b4Eed078e39D50F66bF0c80cF1b93abe"; // alfajores
const blockchainParametersProxy = "0x2F6fEAcB6a4326c47E5AC16dddb5542ADAf45FC8"; // baklava

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contract = new ethers.Contract(blockchainParametersProxy, gasLimitAbi, provider);

const filter = contract.filters.BlockGasLimitSet();
// This is a query filter to the latest block.
const logs = await contract.queryFilter(filter, 0)

for (let l of logs) {
	let block = await l.getBlock();
	await checkBlockChange(block.number, l.args[0]);
	console.log();
}

async function checkBlockChange(blockNumber, gasLimit) {
	console.log(`Event block ${blockNumber} gasLimit set to ${gasLimit}`);
	for (let i = -2; i < 3; i++) {
		let num = blockNumber + i;
		let b =  await provider.getBlock(num);
		console.log(`Check block ${num} gasLimit ${b.gasLimit}`);
	}
}
