import Button from "../../ui/Button";
import { useDispatch } from 'react-redux';
import { removeItem } from "./cartSlice";

function DeleteIteme({pizzaId}) {
const dispatch = useDispatch()



    return (
        <Button onClick={()=>{dispatch(removeItem(pizzaId))}} type="small">Delete</Button>
    )
}

export default DeleteIteme
