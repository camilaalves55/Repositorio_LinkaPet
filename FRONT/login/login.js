async function handleSubmit(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    const data = {
        email,
        senha,
        tipoUsuario
    };

    console.log("Dados enviados para o servidor:", data);

    try {
        const response = await fetch('http://localhost:3005/api/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await response.json();

        console.log("Resposta recebida do servidor:", result);

        if (result.success) {
            localStorage.setItem('userEmail', result.data.email);
            localStorage.setItem('userTipoCliente', result.data.tipo_cliente);

            if (result.data.tipo_cliente === 'fisico') {
                localStorage.setItem('id_cliente', result.data.id); 
                console.log("ID do cliente armazenado:", result.data.id);
                const clienteId = localStorage.getItem('id_cliente');
                    console.log("ID do cliente recuperado:", clienteId);
                window.location.href = "../inicio/inicio1.html";
            } else if (result.data.tipo_cliente === 'juridico') {
                localStorage.setItem('id_empresa', result.data.id);
                console.log("ID da empresa armazenado:", result.data.id);
                window.location.href = "../inicio/inicio1E.html";
            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Tipo de cliente não reconhecido",
                    icon: "error"
                });
            }
        } else {
            Swal.fire({
                title: "Erro",
                text: result.message,
                icon: "error"
            });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        Swal.fire({
            title: "Erro",
            text: "Ocorreu um erro ao fazer login.",
            icon: "error"
        });
    }
}