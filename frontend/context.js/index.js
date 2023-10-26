"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import configuration from "../../build/contracts/Tickets.json"
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core';


const StateContext=createContext();

export const StateContextProvider=({children})=>{

        // fetching the address and abi from the idl
        const CONTRACT_ADDRESS=configuration.networks['5777'].address;
        const CONTRACT_ABI=configuration.abi;
    
        // to get the value from the hook
        const {activate,deactivate,account,active}=useWeb3React();
    
        const web3=new Web3(
            Web3.givenProvider||'http://127.0.0.1:7545'
        );
        // defining the contract
        const contract=new web3.eth.Contract(
            CONTRACT_ABI,CONTRACT_ADDRESS
        );

    // to store the all the state from the blockchain
    const [tickets,setTickets]=useState();

    // a function to fetch the data form the blokcchain
    const fetchData=async()=>{
        try{
            let allTickets=[];
            for(let i=0;i<10;i++)
            {
                const ticket=await contract.methods.tickets(i).call();
                allTickets=[...allTickets,{...ticket,id:i}];
            }
            console.log(allTickets);
            setTickets(allTickets.filter((ticket)=>ticket.isAvailaible));
        }
        catch(e)
        {
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);
    
    // a function to connect to the metamask wallet
    const injected = new InjectedConnector({ supportedChainIds: [1337] });

    // a function to connect to the metamask wallet
    const connect=async()=>{
        console.log("connecting to metamask");
        try{
            await activate(injected);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // a function to diconnect to metamask wallet
    const disconnect= ()=>{
        console.log("disconnecting to metamask");
        try{
            deactivate();
        }
        catch(e)
        {
            console.log(e);
        }
    }
     
    // a function to buy a ticket
    const buyTicket=async (ticket,i)=>{
        if(account)
        {
            try{
                const originalTicket=await contract.methods.tickets(i).call();
                console.log("from the blockchain",originalTicket);
                await contract.methods
                .buyTicket(i)
                .send({ from: "0x10c8937482c3Ee59eDf0eB0f41dCF0888AE9cdBa", value: ticket.price });
                await fetchData();
                console.log("from the blockchain",ticket);
            }
            catch(e)
            {
                console.log(e.message);
            }
            console.log("You are buying the ticket",ticket);
        }
        else{
            console.log("The wallet is not connected");
        }
    }

    return (
        <StateContext.Provider value={{connect,disconnect,account,active,tickets,buyTicket}}>
            {children}
        </StateContext.Provider>)
}

export const useStateContext=()=>(useContext(StateContext));