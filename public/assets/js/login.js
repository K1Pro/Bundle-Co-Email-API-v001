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
  errorMsg = 'Something went wrong'
) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  return response.json();
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
