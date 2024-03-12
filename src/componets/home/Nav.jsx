import React from 'react'



function Nav({LogoImg, showModule}) {
  return (
    <>
        <nav class="nav">
      <div class="nav__wrapper">
        <figure class="nav__img--mask">
          <img class="nav__img" src={LogoImg} alt="logo" />
        </figure>
        <ul class="nav__list--wrapper">
          <li class="nav__list nav__list--login" onClick={showModule}>Login</li>
          <li class="nav__list nav__list--mobile">About</li>
          <li class="nav__list nav__list--mobile">Contact</li>
          <li class="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Nav