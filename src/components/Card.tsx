import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  highlighted?: boolean
}

export default function Card({ hover, highlighted, className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-white p-6 shadow-card ${
        highlighted ? 'ring-2 ring-emerald/40' : ''
      } ${hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-lg' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
