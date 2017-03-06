if(!window.name){  
    console.log("第一次开这个窗口！name值"+ window.name); 
    $wel_modal.modal('show'); 
    window.name = 'test';  
}else{  
    console.log('刷新操作 name值：'+ window.name);  
} 