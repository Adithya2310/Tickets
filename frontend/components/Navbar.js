import { useStateContext } from "@/context.js"


const Navbar = () => {
  const {connect,disconnect,active}=useStateContext();
  // a function to connect to metamask
  const handleConnect=async()=>{
    await connect().catch(err=>console.log("error",err));
  }
  const handleDisconnect=async()=>{
    await disconnect();
  }
  return (
    <div className=" text-center mb-16 mt-4">
    {
      active?<button onClick={handleDisconnect}>Disconnect</button>:<button onClick={handleConnect}>Connect</button>
    }
    </div>
  )
}

export default Navbar