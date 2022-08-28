import "./App.css";
import ButtonAppBar from './Bar';
import { useEffect, useState } from "react";
import moment from 'moment'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

function App() {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("1");
  const [cooking_date, setCookingDate] = useState<string>('');
  const [cooking_by, setCookingBy] = useState<string>();
  const [list, setList] = useState<[]>([]);
  const [deleteList, setDeleteList] = useState<[number]>([0]);
  const [renderTrigger, setRenderTrigger] = useState<number>(0);

  useEffect(() => {
    fetch("/api/list")
    .then((res) => res.json())
    .then((res)=>{
      setList(res.list)})

    .then(()=>{
      let dateNow = moment().format();
      console.log(dateNow.split('T')[0])
      setCookingDate(dateNow.split('T')[0]);
      console.log(cooking_date);
    })
  }
  , [renderTrigger]);

  // const amountList = ["1","1.5","2","2.5","3","4"];

  // const amountElements = amountList.map((elements, index) => {
  //   return (
  //     <option value={elements} key={index}>
  //       {elements}
  //     </option>
  //   );
  // });

  const requestSend =()=> {
    const sendObj = {
      name: name,
      amount: amount,
      cooking_date: cooking_date,
      cooking_by: cooking_by,
    }
    console.log("ボタン押したよ")
    return fetch("/api/foods",{
        method: 'POST',
        headers:{"Content-type": "application/json"},
        body: JSON.stringify(sendObj)
      })
      .then(()=>setRenderTrigger(renderTrigger+1))
  }

  const formatDate = (date: Date): string => {
    const y: number = date.getFullYear();
    const m: string = ("00" + (date.getMonth() + 1)).slice(-2);
    const d: string = ("00" + date.getDate()).slice(-2);
    return `${y + "-" + m + "-" + d}`;
  };

  const setDeleteId = (id:number)=>{
    const currentDeleteList = deleteList;
    if(currentDeleteList.includes(id)){
      const index = currentDeleteList.indexOf(id);
      currentDeleteList.splice(index,1);
    }else{
      currentDeleteList.push(id);
    }
    console.log(id,"番目のデータを削除リストに入れたよ")
    console.log(currentDeleteList);
    setDeleteList(currentDeleteList);
  }

  const listElements = list.map((row,index)=>{
    const date:Date = new Date(row["cooking_date"]);
    let dateNow:Date = new Date(formatDate(new Date()));
    let diffDay: number = Math.floor((dateNow.getTime() - date.getTime()) / 86400000)
    return(
      <tr key={index}>
      <td><input type="checkbox" onClick={()=>setDeleteId(row["id"])}></input></td>
      <td>{row["name"]}</td>
      <td>{row["amount"]}人分</td>
      <td>{row["cooking_by"]}</td>
      <td>{row["cooking_date"]}</td>
      <td>{diffDay}日</td>
      </tr>
    )
  })

  const requestDelete = ()=>{
    console.log("削除してるよ")
    fetch("/api/foods",{
      method:"PATCH",
      headers:{"Content-type": "application/json"},
      body: JSON.stringify(deleteList),
      })
      console.log("削除完了")
      setDeleteList([0])
      setRenderTrigger(renderTrigger+1);
      window.location.reload();
  }

  return (
    <>
    <ButtonAppBar/>
    {/* <header className="header">食べてね😋</header> */}
    <main style={{backgroundImage:"url(/backGroundImage.png)"}}>
    <div className="inputForm">
    <TextFields setName={setName} setCookingBy={setCookingBy}/>
    <AmountSelect setAmount={setAmount}/>
    <div className="sendButton">
    <SendButton requestSend={requestSend}/>
    </div>
    </div>
    {/* <div className="form"> */}
      {/* 料理名：<input type="text" placeholder="料理名" onChange={(e)=>setName(e.target.value)}></input><br/> */}
      {/* 作った人：<input type="text" placeholder="だれが" onChange={(e)=>setCookingBy(e.target.value)}></input><br/> */}
      {/* 量：<select onChange={(e)=>setAmount(e.target.value)}>{amountElements}</select><br/> */}
      {/* <div className="insertBotton"><button onClick={()=>{requestSend()}}>投稿</button></div> */}
    {/* </div> */}
    <div className="table">
    <table>
      <tr>
        <th>削除する</th>
        <th>料理名</th>
        <th>量</th>
        <th>作った人</th>
        <th>作った日</th>
        <th>経過した日数</th>
      </tr>
      {listElements}
    </table>
    <div className="deleteBotton">
      <DeleteButton requestDelete={requestDelete}/>
      {/* <button  onClick={()=>{requestDelete()}}>削除</button> */}
      </div>
    </div>
    </main>
    </>
  );}

export default App;

type Props1 ={
  setName : Function,
  setCookingBy:Function,
}

const TextFields : React.FC <Props1> = ({setName,setCookingBy})=> {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 0.5, width: "25ch"}
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="text"
        id="name"
        label="料理名"
        variant="outlined"
        className="textfield"
        onChange={(e)=>setName(e.target.value)}
      />
      <br/>
      <TextField
        type="text"
        id="cookingBy"
        label="作った人"
        variant="outlined"
        className="textfield"
        onChange={(e)=>setCookingBy(e.target.value)}
      />
    </Box>
  );
}

type Props2 ={
  setAmount:Function
}

const AmountSelect : React.FC <Props2>=({setAmount})=> {
  return (
    <Box sx={{
      "& > :not(style)": { m: 1, width: "10ch" }
    }} >
      <FormControl  >
        <InputLabel id="demo-simple-select-label">量</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Amount"
          className="textfield"
          onChange={(e)=>setAmount(e.target.value)}
        >
          <MenuItem value={1}>1人分</MenuItem>
          <MenuItem value={2}>2人分</MenuItem>
          <MenuItem value={3}>3人分</MenuItem>
          <MenuItem value={4}>4人分</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}

type Props3 ={
  requestSend:Function
}

const SendButton : React.FC <Props3> = ({requestSend})=>{
  return (
      <Button variant="contained" onClick={()=>requestSend()}>リストに追加</Button>
  );
}

type Props4 ={
  requestDelete:Function
}

const DeleteButton : React.FC <Props4> = ({requestDelete})=>{
  return (
      <Button variant="contained" onClick={()=>requestDelete()}>削除</Button>
  );
}