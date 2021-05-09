const customEncode = (str) =>{
    return encodeURI(str).replaceAll(/\./g,'%2E');
}

const customDecode = (str) =>{
    return str.replaceAll('%2E','.');
}