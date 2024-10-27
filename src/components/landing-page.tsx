'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, BarChart2, Box, MessageCircle, ShoppingBag, Smartphone, DollarSign, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; radius: number; vx: number; vy: number }[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.05 - distance / 2000})`
            ctx.stroke()
          }
        })
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

const FloatingIcons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5">
      {[ShoppingBag, BarChart2, MessageCircle, DollarSign].map((Icon, index) => (
        <Icon
          key={index}
          className="absolute text-black opacity-10"
          style={{
            fontSize: `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    '/dashboard-mockup.jpg',
    '/inventory-management.jpg',
    '/analytics-dashboard.jpg',
    '/finance-tracking.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`NanoTrade Feature ${index + 1}`}
            className="w-full h-[400px] object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  )
}

export function LandingPageComponent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingIcons />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={`space-y-6 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Empower Your Business with NanoTrade
              </h1>
              <p className="text-xl text-gray-700">
                Manage your shop efficiently and reach millions of customers through WhatsApp.
              </p>
              <Button size="lg" className="bg-primary text-white" onClick={() => window.location.href = '/auth/register'}>
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </div>
            <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-10-27%20at%2007.01.14_7f8902bf-fpkZEgPZHaXASKy2gOAEK7dgcpzAqp.jpg"
                alt="NanoTrade Dashboard"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-lzkk0K2zfwnPemdMiB5zEOX2vnKl5Q.png"
                alt="NanoTrade Logo"
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-4 border-white shadow-lg animate-bounce"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white bg-opacity-70 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Powerful Shop Management Tools</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Box, title: 'Inventory Management', description: 'Keep track of your stock in real-time' },
                { icon: BarChart2, title: 'Business Analytics', description: 'Make informed decisions with data-driven insights' },
                { icon: ShoppingBag, title: 'Order Processing', description: 'Streamline your order fulfillment process' },
                { icon: DollarSign, title: 'Finance Tracking', description: 'Monitor your financial performance effortlessly' },
              ].map((feature, index) => (
                <div key={index} className="bg-white bg-opacity-60 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <feature.icon className="w-12 h-12 text-primary mb-4 animate-spin-slow" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Bot Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-in">
                Reach Millions of Customers with Our WhatsApp Bot
              </h2>
              <p className="text-xl text-gray-700">
                Turn WhatsApp into a powerful search engine for your products and services.
              </p>
              <ul className="space-y-4">
                {[
                  'Chat-based product search',
                  // 'Real-time inventory updates',
                  'Secure checkout process',
                  'Escrow payment system',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <MessageCircle className="w-6 h-6 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => window.location.href = 'https://wa.me/237657014367'}>
                Connect WhatsApp <Smartphone className="ml-2" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-10-27%20at%2006.58.52_883cf6bd-meBqx09LRiYQwunKXpcSJuIZ6xoRiT.jpg"
                alt="WhatsApp Bot Interface"
                className="rounded-3xl shadow-2xl mx-auto transition-transform duration-300 hover:scale-105 w-64 h-auto"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">1M+ Active Users</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary bg-opacity-90 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Ready to Grow Your Business?</h2>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Button size="lg" variant="secondary" onClick={() => window.location.href = '/auth/register'}>
                Sign Up as a Shop Owner <ShoppingBag className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" onClick={() => window.location.href = 'https://wa.me/237657014367'}>
                Try Our WhatsApp Bot <MessageCircle className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 bg-opacity-90 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">NanoTrade</h3>
                <p className="text-gray-400">Empowering businesses through innovative solutions.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2023 NanoTrade. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}