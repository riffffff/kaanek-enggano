import { Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  arrowPosition = 'right',
  className = '',
  ...props
}) {
  const baseClasses = 'inline-flex items-center gap-2 transition-all'
  
  const variantClasses = {
    primary: 'rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 hover:shadow-md',
    ghost: 'text-sm font-semibold text-white/80 hover:text-white',
    ghostLight: 'text-sm font-semibold text-primary-700 hover:text-primary-800',
  }

  const sizeClasses = {
    md: '',
  }

  const Tag = href ? Link : 'button'

  return (
    <Tag
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {showArrow && arrowPosition === 'left' && <ArrowLeft size={18} />}
      {children}
      {showArrow && arrowPosition === 'right' && <ArrowRight size={16} />}
    </Tag>
  )
}
