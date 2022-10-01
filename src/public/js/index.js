const $followingList = document.querySelector('#following-list');
const $form = document.querySelector('#form-add-account');
const $username = document.querySelector('#account-username');

const state = {
  following: [],
  newTofollow: [],
};

window.addEventListener('load', function () {
  const data = localStorage.getItem('following');
  if (data) {
    state.following = JSON.parse(data);
    state.following.forEach((username) => renderList(username));
  }
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = $username.value;

  if (!username) return;

  const alreadyExist =
    state.following.includes(username) || state.newTofollow.includes(username);

  if (alreadyExist) return;

  state.newTofollow.push(username);

  $username.value = '';

  if (state.following.length > 0) {
    localStorage.setItem(
      'following',
      JSON.stringify([...state.following, ...state.newTofollow])
    );
  } else {
    localStorage.setItem('following', JSON.stringify(state.newTofollow));
  }

  renderList(username);
});

const renderList = (username) => {
  $followingList.innerHTML += `
   <a href="/@/${username}/" class="text-decoration-none">
    <li class="list-group-item list-group-item-action">
    ${username}
    </li>
  </a>
  `;
};
