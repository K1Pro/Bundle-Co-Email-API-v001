const srvrURL = `http://email.api.bundle-insurance.com/controller/sessions.php`;

const signin = document.getElementById('signin');
const floatingInput = document.getElementById('floatingInput');
const floatingPassword = document.getElementById('floatingPassword');

// Example POST method implementation:
async function postData(
  url = srvrURL,
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
      username: document.getElementById('floatingInput').value,
      password: document.getElementById('floatingPassword').value,
    }), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

signin.addEventListener('click', function (event) {
  event.preventDefault();
  console.log(document.getElementById('floatingInput').value);
  console.log(document.getElementById('floatingPassword').value);
  postData().then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    if (data.data.access_token) {
      localStorage.setItem(
        'bundle-email-v001-access-token',
        data.data.access_token
      );
    }
  });
});
