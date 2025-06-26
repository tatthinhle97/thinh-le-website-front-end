import {HugeiconsIcon} from '@hugeicons/react'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import widthConstant from '../constants/width.jsx'
import NavigationBarContext from '../contexts/navigation-bar.jsx'
import stringUtility from '../utilities/string.jsx'
import IconButton from './buttons/icon.jsx'
import HeaderNavigationBar from './navigation-bars/header.jsx'
import {Hamburger01Icon} from '@hugeicons-pro/core-solid-rounded'
import VerticalNavigationBar from './navigation-bars/vertical.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    shadowTheme: (_state) => _state.shadowTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Header({className}) {
  const {
    backgroundTheme,
    shadowTheme,
    textTheme
  } = useSelector(themeStates)
  const [viewportHeight, setViewportHeight] = useState(() => {
    return typeof window !== 'undefined'
      ? window.innerHeight
      : 0
  })
  const sentinelRef = useRef(null)
  const headerRef = useRef(null)
  const backdropRef = useRef(null)
  const verticalNavigationBarContainerRef = useRef(null)
  const hamburgerButtonRef = useRef(null)

  /* Set shadow for header when scrolling */
  useEffect(() => {
    const observeSentinel = ([entry]) => {
      const shadowSizeClassName = 'shadow-xl'

      if (!entry.isIntersecting) {
        headerRef.current.classList.add(
          shadowSizeClassName,
          shadowTheme.opacity.twenty.accentColor700)
      } else {
        headerRef.current.classList.remove(
          shadowSizeClassName,
          shadowTheme.opacity.twenty.accentColor700)
      }
    }

    const sentinelObserver = new IntersectionObserver(
      observeSentinel,
      {
        // [Tip]: where the view box of the target is based on, default is the viewport
        root: null,
        // [Tip]: threshold is the percentage
        //    0: first pixel of the element is considered intersected
        //    ...:
        //    1: full element is considered intersected
        threshold: 0,
        // [Tip]: rootMargin is for zoom in or zoom out the view box
        rootMargin: '0px 0px 0px 0px'
      }
    )

    const sentinel = sentinelRef.current

    if (sentinel) {
      sentinelObserver.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        sentinelObserver.unobserve(sentinel)
        sentinelObserver.disconnect()
      }
    }
  }, [
    shadowTheme.accentColor700,
    shadowTheme.opacity.twenty.accentColor700
  ])

  const toggleBackdropHiddenClassName = useCallback(() => {
    backdropRef.current.classList.toggle('hidden')
  }, [])

  const toggleVerticalNavigationBarContainerTranslateClassName
    = useCallback(() => {
      if (verticalNavigationBarContainerRef.current.classList.contains('-translate-x-80')) {
        verticalNavigationBarContainerRef.current.classList.remove('-translate-x-80')
        verticalNavigationBarContainerRef.current.classList.add('translate-x-0')
      } else if (verticalNavigationBarContainerRef.current.classList.contains('translate-x-0')) {
        verticalNavigationBarContainerRef.current.classList.remove('translate-x-0')
        verticalNavigationBarContainerRef.current.classList.add('-translate-x-80')
      }
    }, [])

  /* Hide vertical bar when screen width exceeded lg breakpoint */
  useEffect(() => {
    const hideBackdropWhenWidthExceededLg = () => {
      const isBackdropShown = !backdropRef.current
        .classList
        .contains('hidden')

      if (window.innerWidth >= widthConstant.lg && isBackdropShown) {
        toggleBackdropHiddenClassName()
        toggleVerticalNavigationBarContainerTranslateClassName()
      }
    }

    const onWindowResize = () => {
      setViewportHeight(window.innerHeight)
      hideBackdropWhenWidthExceededLg()
    }

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [
    toggleBackdropHiddenClassName,
    toggleVerticalNavigationBarContainerTranslateClassName
  ])

  /* Calculate the remaining height by subtracting the header height */
  useEffect(() => {
    const headerHeight = headerRef.current.getBoundingClientRect().height
    const remainingHeight = viewportHeight - headerHeight

    if (backdropRef.current) {
      backdropRef.current.style.height = `${remainingHeight}px`
    }

    if (backdropRef.current) {
      verticalNavigationBarContainerRef.current.style.height = `${remainingHeight}px`
    }
  }, [viewportHeight])

  const animateHamburgerButton = () => {
    hamburgerButtonRef.current.classList.add('animate-hamburger')

    setTimeout(() => {
      hamburgerButtonRef.current.classList.remove('animate-hamburger')
    }, 300)
  }

  const onHamburgerButtonClick = (_event) => {
    _event.preventDefault()
    animateHamburgerButton()
    toggleBackdropHiddenClassName()
    toggleVerticalNavigationBarContainerTranslateClassName()
  }

  const onBackdropClick = () => {
    toggleBackdropHiddenClassName()
    toggleVerticalNavigationBarContainerTranslateClassName()
  }

  const onNavigationItemClick = () => {
    toggleBackdropHiddenClassName()
    toggleVerticalNavigationBarContainerTranslateClassName()
  }

  return <>
    {/* [Tip]: Use a sentinel with intersectionObserver to set shadow for the header */}
    <div ref={sentinelRef}></div>
    <header
      ref={headerRef}
      className={stringUtility.merge([
        'sticky top-0 z-50',
        'transition-box-shadow duration-300',
        backgroundTheme.primaryColor,
        className
      ])}>
      <section
        className={stringUtility.merge([
          'container-layout py-6 section-px',
          'flex justify-between items-center'
        ])}>
        <Link
          aria-label={'Author name'}
          className={'text-xl'}
          to={{
            pathname: '/'
          }}>
          Tat Thinh Le
        </Link>
        <HeaderNavigationBar />
        <IconButton
          ariaLabel={'Hamburger button'}
          ref={hamburgerButtonRef}
          onClick={onHamburgerButtonClick}
          className={`lg:hidden cursor-pointer ${textTheme.hover.accentColor700}`}>
          <HugeiconsIcon icon={Hamburger01Icon} size={28} />
        </IconButton>
      </section>
      <NavigationBarContext.Provider value={onNavigationItemClick}>
        <div
          onClick={onBackdropClick}
          ref={backdropRef}
          className={stringUtility.merge([
            'hidden absolute inset-x-0',
            backgroundTheme.opacity.fifty.secondaryColor
          ])}>
        </div>
        <section
          ref={verticalNavigationBarContainerRef}
          className={stringUtility.merge([
            'w-80 absolute -translate-x-80 transition-transform',
            backgroundTheme.primaryColor
          ])}>
          <VerticalNavigationBar />
        </section>
      </NavigationBarContext.Provider>
    </header>
  </>
}
