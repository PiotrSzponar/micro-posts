import { http } from './http';
import { ui } from './ui';

const api = 'https://jsonplaceholder.typicode.com/posts';

// Get all post list and show them
const getPosts = () => {
  ui.post.innerHTML = '';
  http
    .get(api)
    .then(data => data.forEach(post => ui.showPost(post)))
    .catch(err => console.log(err));
};

// Submit new post
const submitPost = () => {
  const title = document.querySelector('#title').value.trim();
  const body = document.querySelector('#body').value.trim();
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body,
  };

  // Validate input
  if (title !== '' || body !== '') {
    if (id === '') {
      // Create post
      http
        .post(api, data)
        .then(() => {
          ui.showAlert('Post Added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
      // setTimeout(() => {
      //   ui.scrollTo('bottom');
      // }, 250);
    } else {
      // Update post
      http
        .put(`${api}/${id}`, data)
        .then(() => {
          ui.showAlert('Post Edited', 'alert alert-success');
          ui.changeFormState('add');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    }
  } else {
    ui.titleInput.classList.add('is-invalid');
    ui.bodyInput.classList.add('is-invalid');
    setTimeout(() => {
      ui.titleInput.classList.remove('is-invalid');
      ui.bodyInput.classList.remove('is-invalid');
    }, 3000);
  }
};

// Delete post
const deletePost = e => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    ui.scrollTo('top');
    const { id } = e.target.parentElement.dataset;
    http
      .delete(`${api}/${id}`)
      .then(() => {
        ui.showAlert('Post removed', 'alert alert-danger');
        getPosts();
      })
      .catch(err => console.log(err));
  }
};

// Enable edit state
const enableEdit = e => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    ui.scrollTo('top');
    const { id } = e.target.parentElement.dataset;
    let postData = {};
    http
      .get(api)
      .then(data => {
        data.forEach(post => {
          if (post.id === Number(id)) {
            postData = {
              id,
              title: post.title,
              body: post.body,
            };
            ui.fillForm(postData);
          }
        });
      })
      .catch(err => console.log(err));
  }
};

// Cancel edit state
const cancelEdit = e => {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
};

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);
