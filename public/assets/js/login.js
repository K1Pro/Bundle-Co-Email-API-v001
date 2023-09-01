///////////////////////////////////////////////////////////
///////////// vvv Temporary Login vvv ////////////////////

const getCookie = (name) =>
  document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.at(2);

const srvrURL = `http://email.api.bundle-insurance.com/controller/sessions.php`;
const emailURL = `http://email.api.bundle-insurance.com/controller/email.php`;
let usernamePrompt, passwordPrompt;

function loginPrompt() {
  while (!usernamePrompt) {
    usernamePrompt = prompt('Please enter username', '');
  }

  while (!passwordPrompt) {
    passwordPrompt = prompt('Please enter password', '');
  }
}

function loadHTML() {
  document.getElementById('app').innerHTML = 'Logged In Finally!!!!';
}

function validationCookie() {
  if (
    getCookie('_access_token') == undefined ||
    getCookie('_access_token') == '' ||
    getCookie('_access_token') == null
  ) {
    loginPrompt();

    if (usernamePrompt && passwordPrompt) {
      postUserData(srvrURL, usernamePrompt, passwordPrompt).then((data) => {
        console.log(data);
        if (data?.data?.access_token) {
          document.cookie = `_access_token=${data.data.access_token}`;
          postEmailData(emailURL, data.data.access_token).then((data) => {
            if (data) {
              console.log(data);
              loadHTML();
            }
          });
        } else {
          usernamePrompt = '';
          passwordPrompt = '';
          validationCookie();
        }
      });
    }
  } else {
    postEmailData(emailURL, getCookie('_access_token')).then((data) => {
      if (data) {
        console.log(data);
        if (data?.statusCode === 200 || data?.statusCode === 201) {
          loadHTML();
        } else {
          document.cookie = '_access_token=';
          validationCookie();
        }
      }
    });
  }
}

async function postUserData(
  url = srvrURL,
  username,
  password,
  // data = {},
  errorMsg = 'Something went wrong'
) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      username: username,
      password: password,
    }), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function postEmailData(url = emailURL, accessToken) {
  console.log(accessToken);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
  });
  return response.json();
}

validationCookie();

// postUserData(srvrURL, 'Bartosz', '7257Touhy!').then((data) => {
//   console.log(data);
//   if (data.data.access_token) {
//     document.cookie = `_access_token=${data.data.access_token}`;
//     console.log(getCookie('_access_token'));
//   }
// });

//   let loggedInUser = localStorage.getItem('BundleContactList-LoginName');
// console.log(localStorage.getItem('_access_token'));
