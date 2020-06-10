async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const title = document.querySelector('input[name="post-title"]').value.trim();
  console.log(`Post title: ${title} and Post ID: ${id}`);

  const response = await fetch(`/api/posts/${id}`, {
    method: 'put',
    body: JSON.stringify({
      title
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }


}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);