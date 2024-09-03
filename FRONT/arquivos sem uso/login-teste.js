async function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {
        email,
        senha
    };
    console.log(data)

    // const data = {email: 'camila@gmail.com', password:"123"};

    const response = await fetch('http://localhost:3005/api/users', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });

    const resulte = await response.json();

    if(resulte.success) {
        console.log(result.data);
        alert(result.message)
        // window.location.href = "";
    } else {
        alert(result.message)
    }
}
