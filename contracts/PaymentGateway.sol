// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentGateway {
    address public owner;

    event PaymentReceived(address indexed from, uint amount, string orderId);

    constructor() {
        owner = msg.sender;
    }

    function pay(string memory orderId) public payable {
        require(msg.value > 0, "Must send ETH to pay");
        emit PaymentReceived(msg.sender, msg.value, orderId);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
