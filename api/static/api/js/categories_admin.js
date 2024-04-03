// hide
function hide(parent) {
    // hide all
    let sous_categories = document.querySelectorAll('#id_sous_categorie option');
    sous_categories.forEach(element => {
        // remove
        if (element.value)
        {
            element.remove()
        }
    });

    // select first
    parent.selectedIndex = 0;
}


// show
function show(parent, data_categories, id) {
    // show
    data_categories.forEach(element => {
        // found the categorie
        if (element['id'] == id)
        {
            // each sous categories
            let sc = element['sous_categories'];
            sc.forEach(el => {
                // create option
                let option = document.createElement('option');
                option.value = el['id'];
                option.innerText = el['nom'];
                parent.appendChild(option);
            })
        }
    });
}


// reselect
function reselect(parent, id) {
    for (let i = 0; i < parent.childNodes.length; i++)
    {
        if (parent.children[i].value == id)
        {
            parent.selectedIndex = i;
            return;
        }
    }
}


// start
document.addEventListener('DOMContentLoaded', async function() {
    // select
    let categories_div = document.querySelector('#id_categorie');
    let sous_categories_div = document.querySelector('#id_sous_categorie');

    // check if we are creating/changing a product
    if (!(categories_div && sous_categories_div))
    {
        return;
    }

    // hide
    let c_val = categories_div.value;
    let sc_val = sous_categories_div.value;
    hide(sous_categories_div);

    // fetch categories with the id of their sous_categories
    let response = await fetch('/api/categories?sc=true');
    let result = await response.json();
    let data_categories = result['categories'];

    // if categorie and sc already selected
    show(sous_categories_div, data_categories, c_val);
    reselect(sous_categories_div, sc_val);

    // when choosing categorie
    categories_div.addEventListener('change', (event) => {
        hide(sous_categories_div);
        let id = event.currentTarget.value;
        show(sous_categories_div, data_categories, id);
    });
});