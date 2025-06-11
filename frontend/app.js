// Replace with your contract's deployed address
const contractAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

// Replace with your contract's ABI
const abi = [ /* ... */ ];
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "orderId",
        "type": "string"
      }
    ],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "orderId",
        "type": "string"
      }
    ],
    "name": "PaymentReceived",
    "type": "event"
  }
];

async function makePayment() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const orderId = document.getElementById("orderId").value;
  const amount = document.getElementById("amount").value;

  try {
    const tx = await contract.pay(orderId, {
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();
    alert("Payment successful!");
  } catch (err) {
    console.error(err);
    alert("Payment failed: " + err.message);
  }
}
