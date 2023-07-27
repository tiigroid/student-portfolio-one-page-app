import Form from './Form';

export default function Register({ onRegister}) {

  function handleSubmit(email, password) {
    onRegister(email, password)
  }

  return (
    <Form
      name='register'
      title ='Join & dream together!'
      button='Sign up'
      link={'Already there? Sign in then'}
      onSubmit={handleSubmit}
    />
  )
}

