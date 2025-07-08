import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, setTransactionError } from "../redux/transactionSlice";
import axios from "axios";
import toast from "react-hot-toast";

const AddTransaction = () => {
  const dispatch = useDispatch();
  const targetForm = useRef();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "",
    date: ""
  });
  console.log(form);
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async () => {
    try {
      const {title,amount,type,date} = form;
      if([title,amount,type,date].some((f)=> f==="")){
        throw new Error("All fields are required");
      }
      await axios.post("http://localhost:5000/api/transaction", form, {
        withCredentials: true
      });
      dispatch(addTransaction(form));
      dispatch(setTransactionError(""));
      setForm({
    title: "",
    amount: "",
    type: "",
    date: ""
  })
    } catch (error){
      dispatch(setTransactionError("error in adding transaction"));
      toast.error(error.message||"error in adding transaction")
      console.log(error)
    }
  };
  return (
    <div>
      <button
        className='btn'
        onClick={() => document.getElementById("my_modal_5").showModal()}>
        Add Transaction
      </button>
      <dialog
        id='my_modal_5'
        className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <form
            className='flex gap-2 flex-col'
            ref={targetForm}
            method='post'
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <div className=''>
              <label className='label'>Title</label>
              <br />
              <input
                type='text'
                className='input'
                name='title'
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder='title'
              />
            </div>
            <div>
              <label className='label'>Amount</label>
              <br />
              <input
                type='number'
                className='input'
                name='amount'
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder='amount'
              />
            </div>
            <div>
              <label className='label'>Date</label>
              <br />
              <input
                type='date'
                className='input'
                name='date'
                placeholder='date'
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className='label'>Category</label>
              <br />
              <select
                defaultValue='Pick a color'
                className='select'
                name='type'
                value={form.type}
                onChange={(e) => handleChange(e)}>
                <option disabled={true}>Category</option>
                <option value='income'>Income</option>
                <option value='expense'>Expense</option>
              </select>
            </div>
          </form>
          <div className='modal-action'>
            <form method='dialog'>
            <button
              className='btn mx-2'
              onClick={() => {
                handleSubmit();
              }}>
              Submit
            </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};


export default AddTransaction;
