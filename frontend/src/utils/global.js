export  const downloadImage = async(image)=>{

    //if we don't have image url then return
    if(!image) return
console.log(image)
    const res = await fetch(image);
    console.log(res);
    const blob = await res.blob();
    console.log(blob);
    const url=  window.URL.createObjectURL(blob);


    const a = document.createElement("a");
    a.href = url;
    a.download = "download.jpg" //change file name if needed

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
    

}