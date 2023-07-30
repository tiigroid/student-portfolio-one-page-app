import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

export default function Header({ userEmail, onLogout }) {
  const [ mobileSectionClosed, setMobileSectionClosed ] = useState(true);

  function handleMoreClick() {
    mobileSectionClosed ?
    setMobileSectionClosed(false) :
    setMobileSectionClosed(true)
  }

  function handleLogout() {
    onLogout()
  }

  return (
    <header className='header'>
      <div className='header__line' />
      <Link to='/' className='header__logo'>D R E A M</Link>
      <p className='header__slogan'>See other people's dreams and show your own</p>
      <div className={`header__container ${ mobileSectionClosed ? '' : 'header__container_mobile'}`}>
        <Routes>
          <Route exact path='/' element={
             <>
            <p className='header__email'>{userEmail}</p>
            <Link to='/sign-in' className='header__link' onClick={handleLogout}>Log out</Link>
            </>
          }/>
          <Route path='/sign-in' element={
            <Link to='/sign-up' className='header__link'>Sign up</Link>
          }/>
          <Route path='*' element={
            <Link to='/sign-in' className='header__link'>Sign in</Link>
          }/>
        </Routes>
      </div>
      <button
          aria-label="more potions"
          type="button"
          className={ mobileSectionClosed ?
            'header__button-more button button_type_more' :
            'header__button-more button button_type_close' }
          onClick={handleMoreClick}/>
      <div className='header__line' />
    </header>
  )
}
