///////////////////////////////////////////////////////////
///////////// vvv Temporary Login vvv ////////////////////

const getCookie = (name) =>
  document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.at(2);

const srvrURL = `http://email.api.bundle-insurance.com/controller/sessions.php`;
let usernamePrompt, passwordPrompt;

// Example POST method implementation:
async function postData(
  url = srvrURL,
  username,
  password,
  // data = {},
  errorMsg = 'Something went wrong'
) {
  console.log(url);
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

postData(srvrURL, 'Bartosz', '7257Touhy!').then((data) => {
  console.log(data);
  if (data.data.access_token) {
    document.cookie = `_access_token=${data.data.access_token}`;
    console.log(getCookie('_access_token'));
  }
});

// while (
//   getCookie('_access_token') == undefined ||
//   getCookie('_access_token') == ''
// ) {
//   console.log('no access');
//   if (!usernamePrompt) {
//     usernamePrompt = prompt('Please enter username', '');
//     console.log(usernamePrompt);
//   }

//   if (usernamePrompt) {
//     if (!passwordPrompt) {
//       passwordPrompt = prompt('Please enter password', '');
//       console.log(passwordPrompt);
//     }

//     if (passwordPrompt) {
//       postData(srvrURL, usernamePrompt, passwordPrompt).then((data) => {
//         if (data.data.access_token) {
//           document.cookie = `_access_token=${data.data.access_token}`;
//         }
//       });
//     } else {
//       alert('Password cannot be blank');
//     }
//   } else {
//     alert('Name cannot be blank');
//   }
// }
//   let loggedInUser = localStorage.getItem('BundleContactList-LoginName');
//   console.log(`${loggedInUser} is logged in`);
