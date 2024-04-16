"use client";
import React, { useState } from 'react';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { ethers } from 'ethers';
import circuit from '../../circuit/target/circuit.json';

export default function Home() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [message, setMessage] = useState('Please connect wallet');
  const [account, setPublickey] = useState();
  const [publicInput, setPublicInput] = useState();
  const [contract, setContract] = useState();

  const abi = [
    "function sendProof(bytes calldata _proof, bytes32[] calldata _publicInputs) external returns (bool)",
    "function publicInput() external view returns (uint)"
  ]

  const connectButton = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    if (ethereum.isMetaMask) {
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress()
      setPublickey(signerAddress)
      const verifierContract = new ethers.Contract("0xA6fFE5330925E76e827633F43EeBf56405e75a88", abi, signer)
      setContract(verifierContract)
      setPublicInput((await verifierContract.publicInput()).toString())
    } else {
      setMsg("Install MetaMask");
    }
  };

  const handleClick = async () => {
    setMessage("Generating proof...")
    const backend = new BarretenbergBackend(circuit);
    const noir = new Noir(circuit, backend);
  
    const input = {
      x: x,
      y: y,
    };
  
    var proof = await noir.generateFinalProof(input);

    var publicInputs = Array.from(proof.publicInputs.values());
    var proofHex = "0x" + Buffer.from(proof.proof).toString('hex')
  
    console.log(publicInputs)
    console.log(proofHex)

    setMessage("Please confirm transaction")

    const verificationResponse = await contract.sendProof(proofHex, publicInputs)

    setMessage("Transaction sent")
  };

  return (
    <div>
      <button onClick={connectButton}>Connect Wallet</button>
      <p>Address: {account}</p>
      <p>Public Input: {publicInput}</p>
      <p>Message: {message}</p>
      <br/>
      <input 
        type="text" 
        placeholder="Enter X" 
        value={x} 
        onChange={(e) => setX(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter Y" 
        value={y} 
        onChange={(e) => setY(e.target.value)} 
      />
      <button onClick={handleClick}>Show Alert</button>
    </div>
  );
}
