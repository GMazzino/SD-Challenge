let userNotification = document.querySelector('#res');
let msgSavedClient = document.querySelector('#msg');
let textInputs = document.querySelectorAll('#frmClient input[type=text]');
let dniInput = document.querySelector('#frmClient input[name=dni]');
let nameInput = document.querySelector('#frmClient input[name=name]');
let lastnameInput = document.querySelector('#frmClient input[name=lastName]');
let sexInputs = document.querySelectorAll('#frmClient input[name=sex]');
let phoneInput = document.querySelector('#frmClient input[name=phone]');
let searchInput = document.querySelector('#search');
let legend = document.querySelector('#frmClient legend');
let btnSubmit = document.querySelector('#btnSubmit');
let btnDelClient = document.querySelector('#btnDelClient');
let btnDlgBoxCancel = document.querySelector('#btnDlgBoxCancel');
let btnMsgDlgBoxClose = document.querySelector('#btnMsgClose');
let btnSearch = document.querySelector('#btnSearch');
let tblContainer = document.querySelector('#tblContainer');
let confirmDlgBox = document.querySelector('#confirmDlgBox');
let msgDlgBox = document.querySelector('#msgDlgBox');
let imgMsgDlgBox = document.querySelector('#imgMsgDlgBox');
let sortOrderByLastname = 1;

// wrOp (writeOperation). false: Creates new client. true: Updates client
let wrOp = false;
let clientToDelete = '';

async function renderClientsTable(field, order) {
  const res = await fetch(`/clients/${field}/${order}`, {
    method: 'GET',
    headers: { 'Content-Type': 'text/html' },
  });
  tblContainer.innerHTML = await res.text();
  document.querySelectorAll('.trash').forEach((trash) => {
    trash.addEventListener('click', async (e) => {
      clientToDelete = e.target.id;
      confirmDlgBox.style.display = 'flex';
    });
  });
  document.querySelectorAll('.edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      wrOp = true;
      legend.innerText = 'Actualizar cliente';
      userNotification.innerHTML = '&nbsp;';
      btnDelClient.hidden = false;
      dniInput.value = btn.parentNode.parentNode.children[0].innerText;
      dniInput.readOnly = true;
      nameInput.value = btn.parentNode.parentNode.children[1].innerText;
      lastnameInput.value = btn.parentNode.parentNode.children[2].innerText;
      sexInputs.forEach((e) => {
        if (e.value == btn.parentNode.parentNode.children[3].innerText) {
          e.checked = true;
        }
      });
      phoneInput.value = btn.parentNode.parentNode.children[4].innerText;
    });
  });
  if (sortOrderByLastname == 1) {
    document.querySelector('#lastname').innerHTML = '&nbsp;&#9652';
  } else {
    document.querySelector('#lastname').innerHTML = '&nbsp;&#9662';
  }
  //Sorts clients list by lastname ASC/DESC
  document.querySelector('#lastname').addEventListener('click', () => {
    sortOrderByLastname == 1 ? (sortOrderByLastname = -1) : (sortOrderByLastname = 1);
    renderClientsTable('lastname', sortOrderByLastname);
  });
}

async function resetForm() {
  textInputs.forEach((e) => {
    e.value = '';
  });
  sexInputs.forEach((e) => {
    e.checked = false;
  });
  dniInput.readOnly = false;
  searchInput.value = '';
  legend.innerText = 'Crear cliente';
  btnDelClient.hidden = true;
  wrOp = false;
  await renderClientsTable('lastname', sortOrderByLastname);
}

async function deleteClient(dni) {
  const res = await fetch('/clients', {
    method: 'DELETE',
    body: `{"dni":"${dni}"}`,
    headers: { 'Content-Type': 'application/json' },
  });
  userNotification.innerText = await res.text();
  confirmDlgBox.style.display = 'none';
  await resetForm();
}

//Clears response notification on form's inputs click
document.querySelectorAll('#frmClient input').forEach((e) => {
  e.addEventListener('focus', () => {
    userNotification.innerHTML = '&nbsp;';
  });
});

// Saves clients data
document.querySelector('#frmClient').addEventListener('submit', async (e) => {
  if (e.cancelable) {
    e.preventDefault();
    let sex;
    let res;
    sexInputs.forEach((e) => {
      e.checked == true ? (sex = e.value) : false;
    });
    const body = `{"dni":"${dniInput.value}","name":"${nameInput.value}","lastname":"${lastnameInput.value}","sex":"${sex}","phone":"${phoneInput.value}"}`;
    if (!wrOp) {
      //New client
      res = await fetch('./clients', {
        method: 'POST',
        body: body,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      //Update client
      res = await fetch('./clients', {
        method: 'PUT',
        body: body,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    resetForm();
    msgSavedClient.innerText = await res.text();
    if (res.status == 201) {
      imgMsgDlgBox.src = './img/ok.png';
    } else {
      imgMsgDlgBox.src = './img/err.png';
    }
    msgDlgBox.style.display = 'flex';
  }
});

//Gets client data by DNI and populates de form
btnSearch.addEventListener('click', async () => {
  const dni = searchInput.value;
  if (dni != '') {
    const res = await fetch(`./clients/${dni}`, { method: 'GET' });
    let client = await res.text();
    try {
      client = JSON.parse(client);
      userNotification.innerHTML = '&nbsp;';
      wrOp = true;
      legend.innerText = 'Actualizar cliente';
      btnDelClient.hidden = false;
      dniInput.value = client.dni;
      dniInput.readOnly = true;
      nameInput.value = client.name;
      lastnameInput.value = client.lastname;
      sexInputs.forEach((e) => {
        if (e.value == client.sex) {
          e.checked = true;
        }
      });
      phoneInput.value = client.phone;
    } catch {
      resetForm();
      userNotification.innerText = client;
    }
    await renderClientsTable('lastname', sortOrderByLastname);
  } else {
    userNotification.innerText = 'Debe ingresar un número de DNI';
  }
});

// Makes search on "Enter" keypress
searchInput.addEventListener('keypress', (key) => {
  if (key.keyCode == 13) {
    btnSearch.click();
  }
});

//Shows delete client dialog box
btnDelClient.addEventListener('click', async () => {
  clientToDelete = dniInput.value;
  confirmDlgBox.style.display = 'flex';
});

// Deletes client
document.querySelector('#btnDlgBoxDelete').addEventListener('click', async () => {
  await deleteClient(clientToDelete);
});

//Closes delete client dialog box
btnDlgBoxCancel.addEventListener('click', () => {
  confirmDlgBox.style.display = 'none';
});

btnMsgDlgBoxClose.addEventListener('click', () => {
  msgDlgBox.style.display = 'none';
});

//Resets form's data
document.querySelector('#btnCancel').addEventListener('click', (e) => {
  resetForm();
});

await renderClientsTable('lastname', sortOrderByLastname);
