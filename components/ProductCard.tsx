'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const imageScale = prefersReducedMotion ? 'scale-100' : (isHovered ? 'scale-[1.05]' : 'scale-100')

  return (
    <article 
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-braise rounded-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/produit/${product.slug}`}
        className="flex flex-col h-full"
      >
        <div className="relative aspect-[4/3] mb-16 overflow-hidden rounded-card bg-white border border-hairline transition-all duration-400 ease-out group-hover:border-ash group-hover:shadow-card">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-transform duration-500 ease-out ${imageScale}`}
            quality={65}
          />
          
          <div className="absolute top-12 left-12">
            <span className="inline-flex items-center px-8 py-4 bg-white/95 backdrop-blur-sm text-[10px] font-semibold text-charcoal rounded-full border border-hairline shadow-sm">
              {product.category === 'buches' && 'Bûches'}
              {product.category === 'bois-compresse' && 'Bois compressé'}
              {product.category === 'granules' && 'Granulés'}
              {product.category === 'allumage' && 'Allumage'}
              {product.category === 'allume-feu' && 'Allume-feu'}
            </span>
          </div>

          {product.species && (
            <div className="absolute top-12 right-12 w-6 h-6 rounded-full bg-braise shadow-sm" />
          )}
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-[20px] font-semibold text-charcoal mb-6 leading-tight group-hover:text-braise transition-colors duration-300">
            {product.name}
          </h3>

          {product.species && (
            <p className="text-[13px] text-smoke mb-4 capitalize transition-colors duration-300 group-hover:text-ash">
              {product.species === 'chene' && 'Chêne'}
              {product.species === 'hetre' && 'Hêtre'}
              {product.species === 'charme' && 'Charme'}
              {product.species === 'mixte' && 'Mixte'}
            </p>
          )}

          <p className="text-[13px] text-smoke mb-16">
            {product.conditioning}
          </p>

          <div className="mt-auto pt-12 border-t border-hairline transition-colors duration-300 group-hover:border-ash">
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-[28px] font-semibold text-charcoal tracking-tight transition-colors duration-300 group-hover:text-braise">
                {formatPrice(product.price)}
              </p>
              {product.variants && product.variants.length > 1 && (
                <p className="text-[11px] text-ash uppercase tracking-wide">à partir de</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-ash">
                {product.deliveryInfo}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          console.log('Quick add:', product.slug)
        }}
        className="absolute bottom-12 right-12 w-36 h-36 text-charcoal hover:text-braise transition-all duration-300 flex items-center justify-center group-hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-braise"
        aria-label={`Ajouter ${product.name} au panier`}
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 2h2l1.5 9h7l1.5-5H4" />
          <circle cx="7" cy="14" r="1" />
          <circle cx="12" cy="14" r="1" />
        </svg>
      </button>
    </article>
  )
}
