const input=document.querySelector("#input");
const search=document.querySelector("#btn");
const output=document.querySelector("#output");
const uList=document.querySelector("ul");

let history=[]

const addSearch=(val,output)=>{
    let newOptions=document.createElement("li");
    newOptions.innerHTML=`${val.toUpperCase().bold()}: ${output}`;
    newOptions.id=val;
    // uList.append(newOptions);   
    uList.insertBefore(newOptions, uList.children[0]);        
}
const removeSearch=(removeVal)=>{
    document.getElementById(removeVal).remove();
}
search.addEventListener("click",async ()=>{
    let val=input.value;
    if(val===""){
        alert("Please enter a word");
    }
    else{
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`;
        
        let response=await fetch(url);
        // console.log(response)
        if(response['status']===404){
            output.textContent=`NOT FOUND`;
            output.style.color='Red';
            output.style.fontWeight='Bold';
        }else{
            let meaning=await response.json()
            // console.log(meaning)
            // console.log("meaning: "+meaning[0]['meanings'][0]["definitions"][0]["definition"]);
            output.style.color='Green';
            output.style.fontWeight='Bold';
            output.textContent=` ${meaning[0]['meanings'][0]["definitions"][0]["definition"]}`
        }
        history.push(val);
        if(history.length===4){
            let removeVal=history.shift();
            removeSearch(removeVal);
        }
        addSearch(val,output.textContent);
        console.log(history);
    }
})