'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function PublicNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

    const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/admin/add-sale', label: 'Admin' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(97, 109, 72, 0.95)', borderBottom: '1px solid rgba(250, 155, 113, 0.3)' }}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src="/logo_text.png" alt="ZigZag" className="h-12 w-auto" />
        </Link>
        
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-s font-medium transition-all relative"
              style={{
                color: isActive(item.href) ? '#fa9b71' : '#ffccb6',
              }}
            >
              {item.label}
              {isActive(item.href) && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5" 
                  style={{ backgroundColor: '#fa9b71' }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
