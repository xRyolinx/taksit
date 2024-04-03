document.addEventListener('DOMContentLoaded', () => {
    let textareas = document.querySelectorAll('textarea').forEach(text => {
        if (text.name != 'image')
        {
            return;
        }

        // file encoded
        let file = text.value;
        let img = document.createElement('img');
        img.src = 'data:;base64,' + file;
        img.setAttribute('style', 'width: 100%; max-width: 250px;');
        // img.style.width = '100%';
        // img.style.max_width = '500px';

        // append img
        text.after(img);
        // remove txt
        text.remove();
    });

    // let field = document.querySelector('.field-cv .readonly');
    // field.style.display = 'none';
    // // file encoded
    // let file = field.innerHTML;
    // let img = document.createElement('img');
    // img.src = 'data:;base64,' + file;
    // img.style.width = '100%';

    // // append img
    // field.after(img);
    // // remove txt
    // field.remove();
});