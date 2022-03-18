const deleteProductBtn = document.querySelectorAll('.product-item button');


async function deleteProduct(event) {
    const buttonElem = event.target;
    const productId = buttonElem.dataset.productid;
    const csrfToken = buttonElem.dataset.csrf;

    //send get requst to the server. this get request is used to delete product from database
    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    if(!response.ok) {
        alert("something's wrong");
        return;
    };

    //access parent element of that button
    buttonElem.parentElement.parentElement.parentElement.parentElement.remove();
}

//loop through all the delete buttons
for(const deletebtns of deleteProductBtn) {
    deletebtns.addEventListener('click', deleteProduct);
}