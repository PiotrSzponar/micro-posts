class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPost(post) {
    const output = `
      <div class="card mb-3">
      <h5 class="card-header">${post.title}</h5>
        <div class="card-body">
          <p class="card-text">${post.body}</p>
          <p class="card-text text-right">
            <a href="#" class="edit card-link" data-id="${
              post.id
            }"><i class="fas fa-pencil-alt"></i></a>
            <a href="#" class="delete card-link text-danger" data-id="${
              post.id
            }"><i class="fas fa-trash"></i></a>
          </p>
        </div>
      </div>
    `;
    this.post.insertAdjacentHTML('beforeend', output);
  }

  showAlert(message, className) {
    this.constructor.clearAlert();

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.post-container');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.constructor.clearAlert();
    }, 3000);
  }

  static clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Change the form state
  changeFormState(type) {
    if (document.querySelector('.post-cancel')) {
      document.querySelector('.post-cancel').remove();
    }
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post!';
      this.postSubmit.classList.remove('btn-primary');
      this.postSubmit.classList.add('btn-warning');

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-sm btn-secondary btn-block mt-2';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.formEnd');
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else if (type === 'add') {
      console.log('add');
      this.postSubmit.textContent = 'Post It!';
      this.postSubmit.classList.remove('btn-warning');
      this.postSubmit.classList.add('btn-primary');

      // Clear ID from hidden field
      this.clearIdInput();
      // Clear fields
      this.clearFields();
    }
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = '';
  }

  scrollTo(place) {
    if (place === 'top') {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });
    } else if (place === 'bottom') {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top:
          this.post.lastElementChild.getBoundingClientRect().bottom +
          this.post.lastElementChild.getBoundingClientRect().height,
      });
    }
  }
}

export const ui = new UI();
