const formRegister = document.querySelector('form')

formRegister.addEventListener('submit', async e => {
    e.preventDefault()
  
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formRegister))
    })
    console.log(response)
    if (response.status === 201) {
      window.location.href = '/users/profile'
    } else {
      const error = await response.json()
      alert(error.message)
    }
  })