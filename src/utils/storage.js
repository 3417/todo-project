


// localStorage 存储
function parse(objStr){
    let val;
    try{
        val = JSON.parse(objStr)
    }catch{
        val = null;
    }
    return val;
};


function stringify(obj){
    let val;
    try{
        val = JSON.stringify(obj);
    }catch{
        val = null;
    }
    return val;
}

export default {
    setItem(key,value){
        value =stringify(value);
        window.localStorage.setItem(key,value)
    },
    getItem(key){
        let value = window.localStorage.getItem(key);
        return value ? parse(value) : null;
    }
}