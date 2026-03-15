import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Upload(){

const [file,setFile] = useState(null)
const navigate = useNavigate()

function sendImage(){

if(!file){
alert("Selecione uma imagem")
return
}

navigate("/result",{state:{image:file}})

}

return (

<div style={{textAlign:"center", marginTop:"100px"}}>
<h2>Enviar imagem para análise</h2>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
/>

<br/><br/>

<button onClick={sendImage} style={{padding:"10px 20px"}}>
    Analisar imagem
</button>

</div>
 )
}

export default Upload