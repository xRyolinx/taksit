// get cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// send
async function send(data, route)
{
    // fetch
    let result = await fetch(route, {
        method: "POST",
        body : data,
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    result = await result.json();

    // afficher resultat du message
    let status = document.getElementById('status');
    if (result['status'] == 'OK')
    {
        status.style.color = "green";
        status.innerHTML = "Message envoyé!";
    }
    else
    {
        status.style.color = "red";
        status.innerHTML = `${result['error']}`;
    }
}


// start
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        let data = new FormData();
        inputs = document.querySelectorAll('form input');
        inputs.forEach(input => {
            data.append(input.name, input.value);
        });

        let produits = [
            {
                'produit_id': 1,
                'mensualite_id': 1,
                'quantite': 1,
            },
            {
                'produit_id': 1,
                'mensualite_id': 1,
                'quantite': 1,
            },
        ]

        data.append('produits', JSON.stringify(produits));

        // envoyer
        let route = form.action;
        send(data, route);
    });
})