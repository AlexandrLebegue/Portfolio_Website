import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useTheme } from '../../../context/ThemeProvider';
import { LangSwitch } from '../../../i18n';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Navbar qui se cache au scroll vers le bas, réapparaît vers le haut.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Carré du logo qui tourne au survol (façon « chargement », vite puis lent).
  const squareRef = useRef<HTMLSpanElement>(null);
  const spinTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) setHidden(false);
        else if (y > lastY.current + 6) setHidden(true);
        else if (y < lastY.current - 6) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const startSpin = () => {
    if (!squareRef.current) return;
    spinTween.current?.kill();
    // Rotation continue avec une cadence (power2.out : vite puis lent à chaque tour).
    spinTween.current = gsap.to(squareRef.current, { rotation: '+=360', duration: 0.85, ease: 'power2.out', repeat: -1 });
  };
  const stopSpin = () => {
    spinTween.current?.kill();
    spinTween.current = null;
    if (squareRef.current) gsap.to(squareRef.current, { rotation: '+=120', duration: 0.6, ease: 'power3.out' });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-sticky flex items-center justify-between
        border-b border-line bg-paper px-4 py-3 md:px-8
        transition-transform duration-300 will-change-transform
        ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Logo : carré (tourne au survol) + nom */}
      <Link
        to="/"
        onMouseEnter={startSpin}
        onMouseLeave={stopSpin}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group flex items-center gap-3 text-ink no-underline"
        aria-label="Alexandre Lebegue — accueil"
      >
        <span ref={squareRef} aria-hidden="true" className="inline-block h-3 w-3 border-2 border-ink" />
        <span className="font-heading text-base font-bold uppercase tracking-tight md:text-lg">
          Alexandre&nbsp;Lebegue
        </span>
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        <Navigation />
        <LangSwitch />
        <button
          onClick={toggleTheme}
          aria-label="Changer de thème"
          className="flex h-9 w-9 items-center justify-center border border-line text-ink
            transition-colors duration-200 hover:bg-ink hover:text-inverse
            focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          {isDarkMode ? '☀' : '☾'}
        </button>
      </div>
    </header>
  );
};

export default Header;
