'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useI18n } from '@/lib/i18n-context'
import { EUROPEAN_COUNTRIES, type CountryIso, type EuropeanCountry } from '@/lib/countries'
import CountryFlag from '@/components/CountryFlag'

type CountryPrefixSelectProps = {
  id?: string
  value: CountryIso
  onChange: (country: EuropeanCountry) => void
  ariaLabel?: string
  hasError?: boolean
  surface?: 'white' | 'canvas'
}

export function CountryPrefixSelect({
  id,
  value,
  onChange,
  ariaLabel = 'Prefisso telefonico internazionale',
  hasError = false,
  surface = 'white',
}: CountryPrefixSelectProps) {
  const { locale } = useI18n()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, EUROPEAN_COUNTRIES.findIndex((c) => c.iso === value)),
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxId = useId()

  const selected = EUROPEAN_COUNTRIES.find((c) => c.iso === value) ?? EUROPEAN_COUNTRIES[0]

  useEffect(() => {
    const idx = EUROPEAN_COUNTRIES.findIndex((c) => c.iso === value)
    if (idx >= 0) setActiveIndex(idx)
  }, [value])

  useEffect(() => {
    if (!open) return
    const handleOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [open])

  const selectCountry = (country: EuropeanCountry) => {
    onChange(country)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      setActiveIndex((prev) => (prev + 1) % EUROPEAN_COUNTRIES.length)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      setActiveIndex((prev) => (prev - 1 + EUROPEAN_COUNTRIES.length) % EUROPEAN_COUNTRIES.length)
      return
    }
    if (event.key === 'Home' && open) {
      event.preventDefault()
      setActiveIndex(0)
      return
    }
    if (event.key === 'End' && open) {
      event.preventDefault()
      setActiveIndex(EUROPEAN_COUNTRIES.length - 1)
      return
    }
    if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault()
      selectCountry(EUROPEAN_COUNTRIES[activeIndex] ?? selected)
    }
  }

  return (
    <div ref={containerRef} className="relative min-w-0" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[52px] w-full items-center justify-between gap-8 rounded-[6px] border px-12 text-left text-[15px] font-medium text-[#252823] transition-colors focus-visible:outline-none ${
          surface === 'canvas' ? 'bg-[#FAF9F6]' : 'bg-white'
        } ${
          hasError
            ? 'border-red-500 ring-2 ring-red-500/15'
            : open
              ? 'border-[#995033] ring-2 ring-[#995033]/15'
              : 'border-[#DEDFD6] hover:border-[#252823]/40 focus-visible:border-[#995033] focus-visible:ring-2 focus-visible:ring-[#995033]/15'
        }`}
      >
        <span className="flex min-w-0 items-center gap-[9px] whitespace-nowrap">
          <CountryFlag country={selected.flag} />
          <span className="text-[14px] font-semibold tracking-tight text-[#252823]">{selected.iso}</span>
          <span className="text-[14px] tabular-nums text-[#64685F]">{selected.dialCode}</span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`shrink-0 text-[#64685F] transition-transform duration-150 ${open ? 'rotate-180 text-[#995033]' : ''}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-[calc(100%+6px)] z-50 w-[264px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[8px] border border-[#DEDFD6] bg-white p-[6px] shadow-[0_18px_40px_rgba(37,40,35,0.14)]"
        >
          {EUROPEAN_COUNTRIES.map((country, idx) => {
            const isSelected = country.iso === selected.iso
            const isActive = idx === activeIndex
            return (
              <li
                key={country.iso}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => selectCountry(country)}
                className={`flex min-h-[42px] cursor-pointer items-center justify-between gap-12 rounded-[5px] px-[10px] py-[8px] text-[14px] transition-colors ${
                  isSelected
                    ? 'bg-[#EEEEE7] font-semibold text-[#252823]'
                    : isActive
                      ? 'bg-[#FAF9F6] text-[#252823]'
                      : 'text-[#252823] hover:bg-[#FAF9F6]'
                }`}
              >
                <span className="flex min-w-0 items-center gap-[10px]">
                  <CountryFlag country={country.flag} />
                  <span className="truncate">{country.name[locale]}</span>
                </span>
                <span className="flex shrink-0 items-center gap-[8px]">
                  <span className="tabular-nums text-[13px] font-medium text-[#64685F]">{country.dialCode}</span>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#995033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.5 8.5 6.5 11.5 12.5 5" />
                    </svg>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

type DeliveryCountrySelectProps = {
  id?: string
  value: string
  onChange: (country: EuropeanCountry) => void
  ariaLabel?: string
  freeShippingBadge?: string
}

export function DeliveryCountrySelect({
  id,
  value,
  onChange,
  ariaLabel = 'Paese di consegna',
  freeShippingBadge,
}: DeliveryCountrySelectProps) {
  const { locale } = useI18n()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxId = useId()

  const normalized = value.trim().toLowerCase()
  const selected =
    EUROPEAN_COUNTRIES.find(
      (c) =>
        c.iso.toLowerCase() === normalized ||
        c.name.it.toLowerCase() === normalized ||
        c.name.fr.toLowerCase() === normalized ||
        c.name.de.toLowerCase() === normalized,
    ) ?? EUROPEAN_COUNTRIES[0]

  useEffect(() => {
    const idx = EUROPEAN_COUNTRIES.findIndex((c) => c.iso === selected.iso)
    if (idx >= 0) setActiveIndex(idx)
  }, [selected.iso])

  useEffect(() => {
    if (!open) return
    const handleOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [open])

  const selectCountry = (country: EuropeanCountry) => {
    onChange(country)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      setActiveIndex((prev) => (prev + 1) % EUROPEAN_COUNTRIES.length)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      setActiveIndex((prev) => (prev - 1 + EUROPEAN_COUNTRIES.length) % EUROPEAN_COUNTRIES.length)
      return
    }
    if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault()
      selectCountry(EUROPEAN_COUNTRIES[activeIndex] ?? selected)
    }
  }

  const badgeText =
    freeShippingBadge ??
    (locale === 'fr' ? 'Livraison offerte' : locale === 'de' ? 'Gratis Versand' : 'Spedizione gratuita')

  return (
    <div ref={containerRef} className="relative w-full" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[52px] w-full items-center justify-between gap-12 rounded-[6px] border bg-white px-16 text-left text-[15px] text-[#252823] transition-colors focus-visible:outline-none ${
          open
            ? 'border-[#995033] ring-2 ring-[#995033]/15'
            : 'border-[#DEDFD6] hover:border-[#252823]/40 focus-visible:border-[#995033] focus-visible:ring-2 focus-visible:ring-[#995033]/15'
        }`}
      >
        <span className="flex min-w-0 items-center gap-[12px]">
          <CountryFlag country={selected.flag} />
          <span className="truncate font-medium text-[#252823]">{selected.name[locale]}</span>
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#64685F]">{selected.iso}</span>
        </span>
        <span className="flex shrink-0 items-center gap-[10px]">
          <span className="hidden rounded-[4px] bg-[#34483A]/10 px-[8px] py-[3px] text-[11px] font-semibold text-[#34483A] sm:inline-block">
            {badgeText}
          </span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 text-[#64685F] transition-transform duration-150 ${open ? 'rotate-180 text-[#995033]' : ''}`}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-[8px] border border-[#DEDFD6] bg-white p-[6px] shadow-[0_18px_40px_rgba(37,40,35,0.14)]"
        >
          {EUROPEAN_COUNTRIES.map((country, idx) => {
            const isSelected = country.iso === selected.iso
            const isActive = idx === activeIndex
            return (
              <li
                key={country.iso}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => selectCountry(country)}
                className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-12 rounded-[5px] px-[12px] py-[8px] text-[14px] transition-colors ${
                  isSelected
                    ? 'bg-[#EEEEE7] font-semibold text-[#252823]'
                    : isActive
                      ? 'bg-[#FAF9F6] text-[#252823]'
                      : 'text-[#252823] hover:bg-[#FAF9F6]'
                }`}
              >
                <span className="flex min-w-0 items-center gap-[12px]">
                  <CountryFlag country={country.flag} />
                  <span className="truncate">{country.name[locale]}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64685F]">{country.iso}</span>
                </span>
                <span className="flex shrink-0 items-center gap-[10px]">
                  <span className="text-[12px] font-medium text-[#34483A]">
                    {locale === 'fr' ? 'Offerte' : locale === 'de' ? 'Gratis' : 'Gratuita'}
                  </span>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#995033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.5 8.5 6.5 11.5 12.5 5" />
                    </svg>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
