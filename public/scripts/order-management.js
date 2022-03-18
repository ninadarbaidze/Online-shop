//get all the forms from admin manage order pages.
const updateOrderFormElements = document.querySelectorAll(
    '.order-actions form'
  );
  
  async function updateOrder(event) {
    event.preventDefault();
    const form = event.target;
  
    const formData = new FormData(form); //FormData object will be populated with the form's current keys/values using the name property of each element for the keys and their submitted value for the values.
    const newStatus = formData.get('status'); //using FormData, we can get any values from that form (using input names)
    const orderId = formData.get('orderid');
    const csrfToken = formData.get('_csrf');
  
    let response;
  
    try {
      response = await fetch(`/admin/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          newStatus: newStatus,
          _csrf: csrfToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      alert('Something went wrong - could not update order status.');
      return;
    }
  
    if (!response.ok) {
      alert('Something went wrong - could not update order status.');
      return;
    }
  
    //get status as a response
    const responseData = await response.json();
  
    form.parentElement.parentElement.querySelector('.badge').textContent =
      responseData.newStatus.toUpperCase();
  }
  
  for (const updateOrderFormElement of updateOrderFormElements) {
    updateOrderFormElement.addEventListener('submit', updateOrder);
  }