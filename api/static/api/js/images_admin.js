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

// sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));


// utility functions
function show_status() {
    document.querySelector('#status').style.display = 'block';
}
function hide_status() {
    document.querySelector('#status').removeAttribute('style');
}
function show_div_buttons() {
    document.querySelector('#add-img-buttons').style.display = 'flex';
}
function hide_div_buttons() {
    document.querySelector('#add-img-buttons').style.display = 'none';
}
function show_buttons() {
    document.querySelector('#enregistrer').style.display = 'block';
    document.querySelector('#annuler').style.display = 'block';
}
function hide_buttons() {
    document.querySelector('#enregistrer').removeAttribute('style');
    document.querySelector('#annuler').removeAttribute('style');
}
function show_select_buttons() {
    document.querySelector('#selectionner').style.display = 'block';
    document.querySelector('#supprimer').style.display = 'block';
}
function hide_select_buttons() {
    document.querySelector('#selectionner').removeAttribute('style');
    document.querySelector('#supprimer').removeAttribute('style');
}
function show_img() {
    document.querySelector('#img-display-container').style.display = 'flex';
}
function hide_img() {
    document.querySelector('#img-display-container').removeAttribute('style');
}
function show_loading() {
    document.querySelector('.loader').style.display = 'flex';
}
function hide_loading() {
    document.querySelector('.loader').removeAttribute('style');
}
// free img
function free_file() {
    document.querySelector('#input-img').innerHTML = 'Ajoutez une image';
    document.querySelector('#file-img').value = '';
}

// load img displayer
function load_img_displayer(id, src, name) {
    let id_input = document.querySelector('#selected-id');
    id_input.value = `article_${id}`;
    let text = document.querySelector('#input-img');
    text.innerText = name;
    let img = document.querySelector('#img-display-container img');

    hide_buttons();
    hide_status();
    hide_loading();

    show_div_buttons();
    show_select_buttons();
    show_img();

    // height of img
    let img_display_container = document.querySelector('#img-display-container');
    img.style.height = img_display_container.clientHeight.toString() + 'px';

    img.src = src;

    // vider file
    document.querySelector('#file-img').value = '';
}

// prepend img
function prepend_img(article) {
    let parent = document.querySelector('#vos-images');
    parent.prepend(article);
}


// send data
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
    await sleep(1000);

    // stop loading
    hide_loading();


    // afficher resultat du message
    let status = document.getElementById('status');
    show_status();

    if (result['status'] == 'OK')
    {
        status.style.color = "green";
        status.innerHTML = "Image enregistrée !";

        // add img to
        let src = URL.createObjectURL(data.get('image'));
        let article = article_html(result['id'], src, data.get('name'));
        prepend_img(article);

        // add select box
        let option = document.createElement('option');
        option.innerText = data.get('name');
        option.value = result['id'];
        let select = document.querySelector('#id_image');
        select.appendChild(option);


        // select article
        await sleep(1500);
        if (document.querySelector('#selectionner').clientHeight == 0)
        {
            article.click();
        }
    }
    else
    {
        status.style.color = "red";
        status.innerHTML = `${result['error']}`;
    }
}

// add img
let add_img_html = `
    <div id='new-images-container'>
        <h2>Selection d'image</h2>
        <div id='form-img-container'>
            <form id='form-img' action='/api/add_image'>
                <div id='input-img'>Ajouter une image</div>
                <input name='image' id='file-img' type='file' hidden></input>
                <div id='img-display-container'>
                    <img src='' alt=''>
                </div>
                <div id='add-img-buttons'>
                    <div id="enregistrer">Enregistrer</div>
                    <div id='annuler'>Annuler</div>
                    <div id='selectionner'>Selectionner</div>
                    <input id='selected-id' hidden>
                    <div id='supprimer'>Supprimer</div>
                    <div class="loader">
                        <div class="ball1"></div>
                        <div class="ball2"></div>
                        <div class="ball3"></div>
                    </div>
                    <p id='status'></p>
                </div>
                <input id='new-img-submit' type='submit' hidden>
            </form>
        </div>
    </div>
`;

function add_img() {
    // for img
    let div_file = document.querySelector('#input-img');
    let input_file = document.querySelector('#file-img');

    // form
    let form = document.querySelector('#form-img');
    form.addEventListener('submit', function(event) {
        // arreter
        event.preventDefault();

        // loading
        hide_buttons();
        show_loading();

        // route
        let route = form.action;
    
        // var
        let check = true;

        // img
        div_file.removeAttribute('style');
        if (! input_file.files[0])
        {
            div_file.setAttribute("style", "border: solid 1.5px red;");
            check = false;
        }

        // formulaire envoyé
        if (check == true)
        {
            // Creer data et vider les champs
            // inputs
            let data = new FormData();

            // name of img
            data.append('name', div_file.innerText);
            // img
            data.append(input_file.name, input_file.files[0]);

            // envoyer
            send(data, route);
        }
    });
    

    // ---- get img from input -----
    // open to get file
    div_file.addEventListener('click', () => {
        input_file.click();
    });
    // insert img
    input_file.addEventListener('change', () => {
        div_file.removeAttribute('style');
        hide_status();
        hide_loading();

        extension = input_file.value.substring(input_file.value.lastIndexOf('.') + 1);
        if (['jpg', 'png', 'svg'].includes(extension) )
        {
            // update text in div
            div_file.innerText = input_file.value.split('\\').pop().split('/').pop();

            // show and hide
            hide_status();
            hide_select_buttons();
            hide_loading();
            show_div_buttons();
            show_buttons();

            // show img and buttons
            let buttons = document.querySelector('#add-img-buttons');
            buttons.style.height = buttons.clientHeight.toString() + 'px'; //for the chargement
            
            // show img display container
            show_img();
            
            // show img
            let img = document.querySelector('#img-display-container img');
            img.src = URL.createObjectURL(input_file.files[0]);
            // height of img
            let img_display_container = document.querySelector('#img-display-container');
            img.style.height = img_display_container.clientHeight.toString() + 'px';
        }
        else
        {
            div_file.innerHTML = "L'image doit etre de type .png, .jpg ou .svg !";
            div_file.style.color = 'red';
            // it deletes the file
            input_file.value = '';
        }

    });

    // annuler
    document.querySelector('#annuler').addEventListener('click', ()=> {
        hide_img();
        hide_div_buttons();
        div_file.innerText = 'Ajouter une image';
        document.querySelector('#img-display-container img').src = '';
    });

    // enregistrer
    document.querySelector('#enregistrer').addEventListener('click', () => {
        document.querySelector('#new-img-submit').click();
    });;

    // selectionner
    document.querySelector('#selectionner').addEventListener('click', () => {
        // load id in input
        let input = document.querySelector('#id_image');
        let id = document.querySelector('#selected-id').value.replace('article_', '');
        input.value = id;
        // load in admin
        console.log(id);
        charger_img_admin(id);
        // quit
        document.querySelector('#quitter').click();
    });;

    // supprimer
    document.querySelector('#supprimer').addEventListener('click', () => {
        // loading
        show_loading();
        hide_buttons();
        hide_select_buttons();

        // Creer data et vider les champs
        let data = new FormData();

        // id of img
        let id = document.querySelector('#selected-id').value.replace('article_', '');
        console.log(id);
        data.append('id', id);

        // delete
        delete_img(data);
    })

    // quitter
    document.querySelector('#quitter').addEventListener('click', () => {
        document.querySelector('#images-container').remove();
    })
}


// delete image
async function delete_img(data)
{
    let route = '/api/delete_image';
    // fetch
    let result = await fetch(route, {
        method: "POST",
        body : data,
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    result = await result.json();
    await sleep(1000);

    // stop loading
    hide_loading();


    // afficher resultat du message
    let status = document.getElementById('status');
    show_status();

    if (result['status'] == 'OK')
    {
        status.style.color = "green";
        status.innerHTML = "Image supprimée !";

        // remove article
        let article = document.querySelector(`#article_${data.get('id')}`);
        article.remove();

        // remove option from select box
        let options = document.querySelectorAll('#id_image option');
        options.forEach(option => {
            if (option.value == data.get('id'))
            {
                option.remove();
            }
        });

        // add new image
        await sleep(1500);
        if (document.querySelector('#selectionner').clientHeight == 0)
        {
            hide_div_buttons();
            hide_img();
            free_file();
        }
    }
    else
    {
        status.style.color = "red";
        status.innerHTML = `${result['error']}`;
    }
}


// article
function article_html(id, src, nom) {
    // create element
    let article = document.createElement('article');
    article.id = `article_${id}`;
    article.innerHTML = `
        <div class='article-img'>
            <img src='${src}'>
        </div>
        <div class='article-name'>${nom}</div>
    `;
    // event
    article.addEventListener('click', ()=> {
        load_img_displayer(id, src, nom);
        // height of buttons div
        let buttons = document.querySelector('#add-img-buttons');
        buttons.style.height = buttons.clientHeight.toString() + 'px'; //for the chargement
    });
    // return
    return article;
}

// get data
async function get_img() {
    let route = '/api/get_images';

    // fetch
    let result = await fetch(route, {
        method: "GET",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });
    result = await result.json();
    data = result['images'];

    // display images
    data.forEach(image => {
        // create article
        let article = article_html(image['id'], image['image'], image['name']);

        // prepend
        prepend_img(article);
    });
}

// load img
let load_img_html = `
    <div id='vos-images-container'>
        <h2>Vos images</h2>
        <div id='vos-img-div'>
            <div id='vos-images'>
                
            </div>
        </div>
    </div>
`;

function load_img() {
    let vos_img_div = document.querySelector('#vos-img-div');
    vos_img_div.style.height = vos_img_div.clientHeight.toString() + 'px';

    get_img();
}


// charger_img_admin
async function charger_img_admin(id) {
    let img = document.querySelector('#img-display-admin');
    let div = document.querySelector('#choose-img-button');
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
    div.innerText = data['name'];
}

// create img field
function create_field_admin(){
    // select fields
    let input_field = document.querySelector('#id_image');
    let parent = input_field.parentElement;
    parent.style.display = 'block';
    input_field.hidden = true;

    // create button to choose img
    let choose_img_button = document.createElement('div');
    choose_img_button.classList.add('vTextField');
    choose_img_button.style.marginTop = '20px';
    choose_img_button.id = 'choose-img-button';
    choose_img_button.innerHTML = "<span>Choisir l'image<span>";
    parent.appendChild(choose_img_button);

    // create img
    let img = document.createElement('img');
    img.id = 'img-display-admin';
    img.setAttribute('style', 'display: block; width: 100%; max-width: 250px; margin-top: 40px;');
    parent.append(img);

    // display img if already has one, or when loads one
    if (input_field.value)
    {
        charger_img_admin(input_field.value, img);
    }
}



// create select img box
let total_html = `
    <header>
        <h2>Choississez l'image</h2>
        <img id='quitter' src='/static/api/img/quitter.svg'>
    </header>
    <div id='all-images-container'>
        ${load_img_html}
        ${add_img_html}
    </div>
`;

function create_img_select() {
    let images_container = document.createElement('div');
    images_container.id = 'images-container';
    document.querySelector('#container').appendChild(images_container);
    images_container.innerHTML = total_html;
}

// start
document.addEventListener('DOMContentLoaded', function() {
    // create choose img field
    create_field_admin();

    // show images
    let choose_img_button = document.querySelector('#choose-img-button');
    choose_img_button.addEventListener('click', function() {
        // afficher selection d'image
        create_img_select();

        // create add img
        add_img();

        // create load img
        load_img();
    });
    // choose_img_button.click();
});