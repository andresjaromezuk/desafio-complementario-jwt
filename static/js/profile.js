const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const age = document.querySelector('#age')
const button = document.querySelector('button')

window.addEventListener('load', async () => {
    const response_json = await fetch('/api/users/profile')
    console.log(response_json)
   
    const response = await response_json.json()

    firstName.innerHTML = `<p>${response.payload.firstName}</p>`
    lastName.innerHTML = `<p>${response.payload.lastName}</p>`
    email.innerHTML = `<p>${response.payload.email}</p>`
    age.innerHTML = `<p>${response.payload.age}</p>` 
    
    button.addEventListener('click', async()=>{
        const response_json = await fetch('/api/sessions/logout',  {
            method: 'DELETE'
        })

        if(response_json.status === 200){
            window.location.href = '/sessions/login'
        }
    })
})

