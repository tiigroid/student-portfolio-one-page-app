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
      linktext={'Already there? Sign in then'}
      link={'/student-portfolio-one-page-app/sign-in'}
      onSubmit={handleSubmit}
    />
  )
}

