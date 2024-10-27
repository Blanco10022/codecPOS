'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Users, DollarSign, BarChart2, MessageCircle, ShoppingCart, CreditCard, Truck, Package } from 'lucide-react'

export function SalesboxLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <ArrowUpRight className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-blue-600">NanoTrade</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Grow Your Shop with Smart Management
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-500">
                    NanoTrade is your all-in-one tool for shop management, customer growth, and business insights. Easily track your financial performance and make informed decisions to boost your success.
                  </p>
                </div>
                <div className="w-full max-w-md space-y-4">
                  <form className="flex space-x-3">
                    <Input
                      className="max-w-lg flex-1 text-lg"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button type="submit" asChild className="text-lg px-6 py-3">
                      <Link href="/auth/register">Get Started</Link>
                    </Button>
                  </form>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Start your free 14-day trial. No credit card required.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[400px] h-[400px]">
                  <Image
                    src="/assets/images/image.png?height=400&width=400"
                    alt="SalesBox Dashboard"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                  <Card className="absolute -top-4 -left-4 w-48">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="text-blue-500" />
                        <div>
                          <div className="text-2xl font-bold">8,458</div>
                          <div className="text-sm text-muted-foreground">New Customers</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-red-500">▼ 8.10%</div>
                    </CardContent>
                  </Card>
                  <Card className="absolute -bottom-4 -right-4 w-48">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="text-green-500" />
                        <div>
                          <div className="text-2xl font-bold">100,000</div>
                          <div className="text-sm text-muted-foreground">Total Revenue</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-green-500">▲ 2.5%</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose NanoTrade?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <BarChart2 className="h-12 w-12 text-blue-500" />
                  <h3 className="text-2xl font-bold">Advanced Analytics</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Gain deep insights into your sales performance with our powerful analytics tools.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Users className="h-12 w-12 text-blue-500" />
                  <h3 className="text-2xl font-bold">Customer Management</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Efficiently manage your customer relationships and improve retention rates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <ArrowUpRight className="h-12 w-12 text-blue-500" />
                  <h3 className="text-2xl font-bold">Sales Forecasting</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Accurately predict future sales trends and optimize your strategies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Boost Your Sales?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of businesses already using SalesBox to drive their growth.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700" asChild>
                    <Link href="/auth/register">Sign Up Now</Link>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 lg:py-32 bg-green-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
                Ready to Buy? Shop with Ease!
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
                <Card className="bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <ShoppingCart className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-semibold">Easy Shopping</h3>
                    <p className="text-gray-600">Browse our wide selection of products</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <MessageCircle className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-semibold">WhatsApp Support</h3>
                    <p className="text-gray-600">Get instant help via our WhatsApp bot</p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <CreditCard className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-semibold">Secure Payment</h3>
                    <p className="text-gray-600">Multiple payment options available</p>
                  </CardContent>
                </Card>
                {/* <Card className="bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <Truck className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-semibold">Fast Delivery</h3>
                    <p className="text-gray-600">Quick and reliable shipping</p>
                  </CardContent>
                </Card> */}
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                <div className="md:w-1/2">
                  <Image
                    src="/assets/images/call.jpeg"
                    alt="WhatsApp Shopping Experience"
                    width={250}
                    height={150}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2 flex flex-col items-center md:items-start">
                  <Button className="w-full max-w-md py-6 text-xl bg-green-500 hover:bg-green-600 text-white" asChild>
                    <Link href="https://wa.me/237657014367" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-4 h-6 w-6" />
                      Start Shopping via WhatsApp
                    </Link>
                  </Button>
                  <p className="mt-4 text-lg text-gray-600 italic max-w-md text-center md:text-left">
                    Experience hassle-free shopping with our intelligent WhatsApp bot. Get product recommendations, place orders, and track deliveries - all through a simple chat!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SalesBox Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}