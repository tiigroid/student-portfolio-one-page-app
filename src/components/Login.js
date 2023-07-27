import Form from './Form';

export default function Login({ onLogin }) {

  function handleSubmit(email, password) {
    onLogin(email, password)
  }

  return (
    <Form
      name='login'
      title ='Hello! Time for dreaming?'
      button='Sign in'
      onSubmit={handleSubmit}
    />
  )
}
