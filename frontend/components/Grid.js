import { useStateContext } from "@/context.js";

const Grid = () => {
  const {tickets}=useStateContext();
  console.log("in grid",tickets);
  return (
    <div>
    Grid
    </div>
  )
}

export default Grid