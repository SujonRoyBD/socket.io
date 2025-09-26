import {useState, useEffect} from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000');

function App() {
  const [msg, setMsg] = useState('')
  const [chats, setChats] = useState([])

useEffect(()=>{
  socket.on('sendmessage',(payload)=>{
    setChats([...chats, payload])
  })
})

  function sendMessage(e){
    e.preventDefault();
    socket.emit('sendmessage', {message: msg, userName:"me"});
    setMsg('');
  }
  return (
   <div style={{backgroundColor:"gray",height:"500px"}}>
    <div style={{marginLeft: '450px', marginTop: '50px',}}>
    {/*input*/}
    <div style={{width: "300px"}} >
      <input style={{marginTop:"30px"}} value={msg} onChange={e=> setMsg(e.target.value)}/>

      <button onClick={sendMessage}>
send 
      </button>
    </div>
     {/*all message show*/}
<div style={{
  height: "300px", width:"210px", border:"2px solid white", marginTop:"20px", backgroundColor:"white", 
}}>
  {
    chats.map((payload,index)=>{
      return(
        <p key={index}>{payload?.message}</p>
      )
    })
  }
</div>
   </div>
   </div>
  );
}

export default App;
