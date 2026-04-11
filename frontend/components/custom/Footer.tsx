'use client' // Required if you use hooks, though not strictly needed for a static footer

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} style={{ backgroundImage: `url('/footer-bg.jpg')` }}>
      <div className={`${styles.footer__content} container`}>
        <div className={styles.footer__content__logo}>
          <div className="logo flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} priority />
            <Link href={'/'} className="text-2xl font-bold">
              hMovies
            </Link>
          </div>
        </div>

        <div className={styles.footer__content__menus}>
          <div className={styles.footer__content__menu}>
            <Link href="/">Home</Link>
            <Link href="/">Contact us</Link>
            <Link href="/">Term of service</Link>
            <Link href="/">About us</Link>
          </div>
          <div className={styles.footer__content__menu}>
            <Link href="/">Live</Link>
            <Link href="/">FAQ</Link>
            <Link href="/">Premium</Link>
            <Link href="/">Privacy policy</Link>
          </div>
          <div className={styles.footer__content__menu}>
            <Link href="/">You must watch</Link>
            <Link href="/">Recent release</Link>
            <Link href="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
