import { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

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
      <Link to='/student-portfolio-one-page-app' className='header__logo'>D R E A M</Link>
      <p className='header__slogan'>See other people's dreams and show your own</p>
      <div className={`header__container ${ mobileSectionClosed ? '' : 'header__container_mobile'}`}>
        <Switch>
          <Route exact path='/student-portfolio-one-page-app'>
            <>
            <p className='header__email'>{userEmail}</p>
            <Link to='/student-portfolio-one-page-app/sign-in' className='header__link' onClick={handleLogout}>Log out</Link>
            </>
          </Route>
          <Route path='/student-portfolio-one-page-app/sign-in'>
                <Link to='/student-portfolio-one-page-app/sign-up' className='header__link'>Sign up</Link>
          </Route>
          <Route path='*'>
                <Link to='/student-portfolio-one-page-app/sign-in' className='header__link'>Sign in</Link>
          </Route>
        </Switch>
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
