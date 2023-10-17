// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <9.0.0;


contract Tickets{
    address payable public owner=msg.sender;
    struct Ticket{
        uint256 price;
        bool isAvailaible;
        address owner;
    }
    mapping(uint256=>Ticket) public tickets;
    constructor() public
    {
        for(uint256 i=0;i<10;i++)
        {
            tickets[i].isAvailaible = true;
            tickets[i].price=1e17; //0.1ETH
            tickets[i].owner=address(0x0);
        }
    }
    function buyTicket(uint256 ticketId) public payable
    {
        require(ticketId<10,"Invalid ticket");
        require(tickets[ticketId].isAvailaible,"Sorry the ticket is already sold out");
        require(msg.value>=1e17,"Invalid amount");
        owner.transfer(msg.value);
        tickets[ticketId].owner=msg.sender;
        tickets[ticketId].isAvailaible=false;
    }
}