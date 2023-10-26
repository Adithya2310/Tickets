import { useStateContext } from "@/context.js";
import Image from "next/image";

const Grid = () => {
  const {tickets,buyTicket}=useStateContext();
  console.log("in grid",tickets);
  return (
    <div className=" px-4 grid lg:grid-cols-4 gap-6 md:grid-cols-2 grid-cols-1">
    {tickets&&tickets.map((ticket,i)=>{
      return (
        <div className=" rounded-lg border-2 border-slate-300 shadow ">
            {i+1}
            <div className="flex justify-center items-center">
            <Image src="/ticket.png" alt="ticket" height={300} width={300}/>
            </div>
            <div className="flex justify-end mr-4 mt-4">
              <button onClick={()=>(buyTicket(ticket,ticket.id))} className="bg-blue-500 text-white px-4 py-1 my-2 rounded-[5px]">Buy</button>
            </div>
        </div>
      )
    })}
    </div>
  )
}

export default Grid