import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'amber'
type Size = 'md' | 'lg' | 'sm'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-forest text-white hover:bg-forest-light active:bg-forest-dark shadow-card disabled:bg-charcoal-light/40',
  secondary:
    'bg-white text-forest border-2 border-forest/15 hover:border-emerald hover:text-emerald-dark shadow-sm',
  ghost: 'bg-transparent text-forest hover:bg-forest/5',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  amber: 'bg-amber text-forest-dark hover:bg-amber-light shadow-card font-semibold',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-2xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`focus-ring font-display font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
