import { useStateContext } from "@/context.js"


const Navbar = () => {
  const {connect,disconnect,active}=useStateContext();
  // a function to connect to metamask
  const handleConnect=async()=>{
    await connect().catch(err=>console.log("error",err));
  }
  const handleDisconnect=async()=>{
    await disconnect().catch(err=>console.log(e));
  }
  return (
    <div className=" text-center">
    {
      active?<button onClick={handleDisconnect}>Disconnect</button>:<button onClick={handleConnect}>Connect</button>
    }
    </div>
  )
}

export default Navbar