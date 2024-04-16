pragma solidity >=0.7.0 <0.9.0;

interface INoirVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

contract NoirCustomLogic {
    INoirVerifier noirVerifier;
    uint public publicInput;

    constructor(address noirVeriferAddress) {
        noirVerifier = INoirVerifier(noirVeriferAddress);
    }

    function sendProof(bytes calldata _proof, bytes32[] calldata _publicInputs) public {
        // ZK verification
        noirVerifier.verify(_proof, _publicInputs);

        // Your custom logic
        publicInput = uint(_publicInputs[0]);
    }
}