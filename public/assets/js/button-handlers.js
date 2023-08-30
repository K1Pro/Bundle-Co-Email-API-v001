const signin = document.getElementById('signin');
const floatingInput = document.getElementById('floatingInput');
const floatingPassword = document.getElementById('floatingPassword');

signin.addEventListener('click', function (event) {
  event.preventDefault();
  console.log(document.getElementById('floatingInput').value);
  console.log(document.getElementById('floatingPassword').value);
});
