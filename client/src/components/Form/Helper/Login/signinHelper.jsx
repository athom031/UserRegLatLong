// sends sign in post call on server side to turn user to online after successful authentication from login helper
function signinHelper(form, d) {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify( { "userName": JSON.parse(d).userName } );
    
        let xhr  = new XMLHttpRequest();
        
        //without http:// -> Access-Control-Allow-Origin error
        let url =  'http://localhost:3000/api/signin';
        
        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
                form.setState( { signSuccess: true } );
                resolve('User is now online');
            }
            else if(xhr.readyState === 4) {
                form.setState( { signError: JSON.parse(this.responseText).message } );
                reject('User signin unsucessful');
            }

        };
        
        xhr.send(data);
    })
    
}

export default signinHelper;