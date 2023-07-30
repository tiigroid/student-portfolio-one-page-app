import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import PageNotFound from './PageNotFound';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [issueOccured, setIssueOccured] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken()
    .then(res => {
      if (res) {
        renderPage();
        setIsLoggedIn(true);
        navigate('/');
      }
    })
    .catch(() => {
      setIsLoggedIn(false);
      navigate('/sign-in');
    })
  }, []);

  function checkToken() {
    const token = document.cookie
    .split('; ')
    .filter(c => c.includes('jwt='))
    .toString()

    if (token) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  function renderPage() {
    api.getUserData()
      .then(data => {
        setUserEmail(data.email);
        setCurrentUser(data)
    })

    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards.reverse())
    })
  }

  function handleRegister(email, password) {
    api.register(email, password)
    .then(() => {
      setIssueOccured(false);
      navigate('/')
    })
    .catch(() => setIssueOccured(true))
    .finally(() => setIsInfoPopupOpen(true))
  }

  function handleLogin(email, password) {
    api.login(email, password)
    .then(() => {
      renderPage();
      setIsLoggedIn(true);
      navigate('/');
    })
    .catch(() => {
      setIssueOccured(true);
      setIsInfoPopupOpen(true);
    })
  }

  function handleLogout() {
    api.logout()
    .then(res => {
      if (res.message === 'Выход') {
        setIsLoggedIn(false);
      }
    })
    .catch(err => alert(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setIsloading(true);
    api.patchUserData(data)
    .then(userData => setCurrentUser(userData))
    .then(() => closeAllPopups())
    .catch(err => alert(err))
    .finally(() => setTimeout(() => (setIsloading(false)), 200))
  }

  function handleUpdateAvatar(data) {
    setIsloading(true);
    api.patchUserAvatar(data)
    .then(userData => setCurrentUser(userData))
    .then(() => closeAllPopups())
    .catch(err => alert(err))
    .finally(() => setTimeout(() => (setIsloading(false)), 200))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then(updCard => {
        setCards(cards.map(cardItem => cardItem._id === card._id ? updCard : cardItem));
    })
    .catch(err => alert(err));
  }

  function handleDeleteClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete(card) {
    setIsloading(true);
    api.deleteCard(card._id)
    .then(() => {
        setCards(cards => cards.filter(cardItem => cardItem._id !== card._id));
    })
    .then(() => closeAllPopups())
    .catch(err => alert(err))
    .finally(() => setTimeout(() => (setIsloading(false)), 200))
  }

  function handleAddPlaceSubmit(data) {
    setIsloading(true);
    api.postCard(data)
    .then(newCard => setCards([newCard, ...cards]))
    .then(() => closeAllPopups())
    .catch(err => alert(err))
    .finally(() => setTimeout(() => (setIsloading(false)), 200))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoPopupOpen(false);
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          onLogout={handleLogout} />
          <Routes>
            <Route exact path='/' element={
            <ProtectedRoute isLoggedIn={isLoggedIn} components={
              <>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onDeleteClick={handleDeleteClick} />
              <Footer />
              </>
              }/>
            }/>
            <Route path='/sign-up' element={
              <Register onRegister={handleRegister}/>
            }/>
            <Route path='/sign-in' element={
              <Login onLogin={handleLogin}/>
            }/>
            <Route path='*' element={
              <PageNotFound />
            }/>
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}/>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}/>
          <DeleteCardPopup
            card={selectedCard}
            isOpen={isDeleteCardPopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}/>
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}/>
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            issueOccured={issueOccured}
            onClose={closeAllPopups}
            titles={{
              regSuccess: 'You have signed up successfully!',
              fail: 'Something went wrong! Please try again.'
            }}/>
      </CurrentUserContext.Provider>
    </div>
  );
}
