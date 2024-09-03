async function cadastrar(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];

    const data = {title, description, file};
    // console.log(data);

    let formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    const response = await fetch('http://localhost:3005/api/cadastrar/post', {
        method: "POST",
        // headers: {
        //     "Content-Type":"application/json"
        // },
        body: formData
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message)
    } else {
        alert(results.message)
    }
}