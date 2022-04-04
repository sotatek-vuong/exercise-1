const dotenv = require('dotenv');
const { JsonRpcProvider } = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const { formatEther, parseEther } = require('@ethersproject/units');

dotenv.config();

const provider = new JsonRpcProvider(
  'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  4
);
const wallet = new Wallet(process.env.PRIVATE_KEY).connect(provider);

(async () => {
  const weiBalance1 = await wallet.getBalance();

  console.log('balance before', formatEther(weiBalance1));

  const tx = await wallet.sendTransaction({
    to: '0x1BaB8030249382A887F967FcAa7FE0be7B390728',
    value: parseEther('0.1'),
  });
  console.log(tx.hash);
  await provider.waitForTransaction(tx.hash);

  const weiBalance2 = await wallet.getBalance();
  console.log('balance after', formatEther(weiBalance2));
})();

// 0x254922a9d55d4c98cb98589d2c194d3dca3489fed685a9ef9f4b031e690eefd5
// https://rinkeby.etherscan.io/tx/0x254922a9d55d4c98cb98589d2c194d3dca3489fed685a9ef9f4b031e690eefd5
