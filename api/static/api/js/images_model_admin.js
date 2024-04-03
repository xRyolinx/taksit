
// cookies
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

// get data
async function get_img(id, img, parent) {
    let route = `/api/get_images?id=${id}`;

    // fetch
    let result = await fetch(route, {
        method: "GET",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    result = await result.json();
    data = result['image'];

    // display
    img.src = data['image'];
    parent.append(img);
}


// start
document.addEventListener('DOMContentLoaded', () => {
    // get id
    id = window.location.pathname.split('/')[4];
    console.log(id);

    // select
    let field = document.querySelector('#id_name');
    let parent = field.parentElement.parentElement;

    // create img
    let img = document.createElement('img');
    img.setAttribute('style', 'display: block; width: 100%; max-width: 250px; margin-top: 40px;');

    // fetch
    get_img(id, img, parent);
});