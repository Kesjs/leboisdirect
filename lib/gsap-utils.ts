import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const createParallaxImage = (
  element: HTMLElement,
  trigger: HTMLElement,
  scale: number = 1.15
) => {
  return gsap.to(element, {
    scale,
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  })
}

export const createFadeInUp = (
  element: HTMLElement | string,
  options: {
    y?: number
    duration?: number
    delay?: number
  } = {}
) => {
  const { y = 30, duration = 0.8, delay = 0 } = options

  return gsap.from(element, {
    opacity: 0,
    y,
    duration,
    delay,
    ease: 'power3.out',
  })
}

export const createStaggerFadeIn = (
  elements: HTMLElement[] | string,
  options: {
    y?: number
    duration?: number
    stagger?: number
    delay?: number
  } = {}
) => {
  const { y = 20, duration = 0.6, stagger = 0.1, delay = 0 } = options

  return gsap.from(elements, {
    opacity: 0,
    y,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
  })
}

export const createPinnedScene = (
  trigger: HTMLElement,
  options: {
    start?: string
    end?: string
    pin?: boolean
    scrub?: number | boolean
  } = {}
) => {
  const { start = 'top top', end = '+=200%', pin = true, scrub = 1 } = options

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin,
    scrub,
  })
}

export const createSceneTransition = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  trigger: HTMLElement,
  options: {
    start?: string
    end?: string
  } = {}
) => {
  const { start = 'top center', end = 'bottom center' } = options

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: 1,
    },
  })

  tl.to(fromElement, { opacity: 0, scale: 0.95, duration: 0.5 })
    .from(toElement, { opacity: 0, scale: 1.05, duration: 0.5 }, '<')

  return tl
}

export const createTextReveal = (
  element: HTMLElement,
  options: {
    duration?: number
    delay?: number
    stagger?: number
  } = {}
) => {
  const { duration = 1, delay = 0, stagger = 0.05 } = options

  const chars = element.textContent?.split('') || []
  element.innerHTML = chars
    .map((char) => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('')

  return gsap.from(element.querySelectorAll('span'), {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger,
    duration,
    delay,
    ease: 'back.out(1.7)',
  })
}

export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
