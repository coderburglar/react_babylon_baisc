export const fetchData = async<T>(url:string)=>{
    const data:T =await  fetch(url).then(res=>res.json())
    console.log(data)
    return data
}







