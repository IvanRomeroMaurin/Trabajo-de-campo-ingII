'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, UserPlus, LogOut, User } from 'lucide-react';
import { logoutAction } from '@/features/auth/actions/logoutAction';

interface MobileMenuProps {
  isLoggedIn: boolean;
  usuario?: any;
}

export function MobileMenu({ isLoggedIn, usuario }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Cerrar al clickear afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Ignorar clicks dentro del menú o en el botón hamburguesa
      if (
        menuRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center ml-2">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
        aria-label="Alternar menú"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menú Desplegable */}
      <div
        ref={menuRef}
        className={`absolute top-full left-0 right-0 w-full bg-white shadow-xl shadow-slate-900/5 border-b border-slate-100 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-4 gap-2 bg-white/95 backdrop-blur-md">
          <Link
            href="/explorar"
            onClick={() => setIsOpen(false)}
            className="px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm"
          >
            Explorar
          </Link>
          <Link
            href="/comunidades"
            onClick={() => setIsOpen(false)}
            className="px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm"
          >
            Mis comunidades
          </Link>
          {isLoggedIn && (
            <Link
              href="/comunidades/crear"
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 rounded-xl text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all font-bold text-sm flex items-center gap-2"
            >
              <Sparkles size={14} className="fill-sky-600/20" />
              Crear Comunidad
            </Link>
          )}

          {/* Divider */}
          <div className="h-px bg-slate-100 my-1" />

          {/* Auth Actions */}
          {isLoggedIn ? (
            <>
              <Link
                href="/perfil"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs border border-slate-200">
                  {usuario?.nombre?.[0]?.toUpperCase()}
                </div>
                {usuario?.nombre || 'Mi Perfil'}
              </Link>
              <form action={logoutAction} className="w-full">
                <button 
                  type="submit" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-5 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Cerrar Sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm flex items-center gap-2"
              >
                <User size={16} />
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3 bg-slate-950 text-white hover:bg-slate-800 rounded-xl transition-all font-bold text-sm flex items-center gap-2"
              >
                <UserPlus size={16} />
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
