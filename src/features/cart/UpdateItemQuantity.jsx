import Button from "../../ui/Button";
import { decreseItemQuantity, increseItemQuantity } from "./cartSlice";
import { useDispatch } from 'react-redux';

function UpdateItemQuantity({pizzaId,quantity}) {
  const dispatch = useDispatch()
  
  
    return (
        <div className="flex gap-2 md:gap-3 items-center">
            <Button onClick={() => dispatch(decreseItemQuantity(pizzaId))} type='rounded'>-</Button>
            <span>{quantity}</span>
            <Button onClick={()=>dispatch(increseItemQuantity(pizzaId))} type='rounded'>+</Button>
            
        </div>
    )
}

export default UpdateItemQuantity
