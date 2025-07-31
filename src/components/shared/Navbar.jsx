"use client"
import logo from "../../../public/logo.png"
import { useState } from "react"
import { Menu, Bell, Heart, MapPin, User, Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [activeRoute, setActiveRoute] = useState(null)

    // Navigation links configuration
    const navLinks = [
        { href: "/listing", label: "Listing", key: "listing" },
        { href: "/aboutus", label: "About us", key: "about-us" },
        { href: "#", label: "Contact", key: "contact" },
    ]

    // Notifications data
    const notifications = [
        {
            title: "New property match!",
            description: "Found 3 properties in your area",
            bgColor: "bg-blue-50",
        },
        {
            title: "Price drop alert",
            description: "Property in Dhanmondi reduced by 10%",
            bgColor: "bg-green-50",
        },
    ]

    const handleRouteClick = (routeKey) => {
        setActiveRoute(routeKey)
        setIsOpen(false) // Close mobile menu when route is selected
    }

    const closeMobileMenu = () => setIsOpen(false)

    const closeDropdowns = () => {
        setShowNotifications(false)
    }

    // Reusable components
    const Logo = ({ className = "" }) => (
        <Link
            href="/"
            className={`flex items-center gap-2 text-xl lg:text-2xl font-bold ${className}`}
            onClick={() => setActiveRoute(null)}
        >
            <Image
                src={logo}
                alt="BasaBari Logo"
                width={30}
                height={30}
            />
            <span className="text-[#FFE7DC]">BasaBari</span>
        </Link>
    );


    const NotificationBell = ({ isMobile = false }) => (
        <div className="relative">
            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white p-2 rounded-lg transition-colors relative mr-0 md:mr-3  bg-[#3D3D3D]"
            >
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-b from-[#E97451] to-[#E34F2C] text-xs rounded-full flex items-center justify-center">
                    2
                </span>
            </button>
            {showNotifications && (
                <div
                    className={`absolute ${isMobile ? "right-0" : "right-0"} top-12 w-80 bg-white text-black rounded-lg shadow-lg border z-50`}
                >
                    <div className="p-4">
                        <h4 className="font-medium mb-2">Notifications</h4>
                        <div className="space-y-2">
                            {notifications.map((notification, index) => (
                                <div key={index} className={`p-2 ${notification.bgColor} rounded`}>
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-xs text-gray-600">{notification.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    const NavigationLinks = ({ isMobile = false }) => (
        <div className={isMobile ? "space-y-1" : "flex items-center space-x-6"}>
            {navLinks.map((link) => (
                <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => handleRouteClick(link.key)}
                    className={`${isMobile
                        ? `flex items-center py-3 px-3 rounded-lg text-base font-medium transition-all duration-200 ${activeRoute === link.key ? "bg-gradient-to-b from-[#E97451] to-[#E34F2C] text-white" : "text-white"
                        }`
                        : `px-4 py-2 rounded-lg transition-colors font-medium ${activeRoute === link.key ? "bg-gradient-to-b from-[#E97451] to-[#E34F2C] text-white" : "text-white"
                        }`
                        }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    )

    const SavedPropertiesButton = ({ isMobile = false }) => (
        <button
            className={`${isMobile
                ? "w-full flex items-center justify-between bg-[#3D3D3D] text-white py-3 px-3 rounded-lg transition-colors"
                : "flex items-center gap-2 bg-[#3D3D3D] text-white px-4 py-2 rounded-lg transition-colors"
                }`}
        >
            {/* Icon + Label */}
            <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className={isMobile ? "text-left" : ""}>
                    Saved{isMobile ? " Properties" : ""}
                </span>
            </div>

            {/* Badge */}
            <span className="bg-white text-gray-800 px-2 py-1 rounded text-sm font-semibold">
                3
            </span>
        </button>

    )

    const PostPropertyButton = ({ isMobile = false }) => (
        <button
            className={`bg-gradient-to-b from-[#E97451] to-[#E34F2C] text-white ${isMobile ? "w-full py-3 px-3" : "px-6 py-2"
                } rounded-lg transition-colors flex items-center justify-center`}
        >
            Post My Property
            <span className="ml-2 bg-white text-[#E34F2C] px-2 py-1 rounded text-sm font-medium">Free</span>
        </button>
    )

    const SignInButton = () => (
        <div className="flex items-center gap-2">
            <Link
                href="/signin"
                className="text-white px-4 py-2 rounded-lg transition-colors  flex items-center gap-2"
            >
                <User className="h-4 w-4" />
                Sign In / Register
            </Link>

        </div>
    )

    return (
        <>
            {/* Mobile Navbar */}
            <nav className="lg:hidden bg-[#313131] text-white px-4 py-3 border-b border-gray-600">
                <div className="flex items-center justify-between">
                    <button onClick={() => setIsOpen(true)} className="text-white p-2 rounded-lg transition-colors">
                        <Menu className="h-6 w-6" />
                    </button>
                    <Logo />
                    <NotificationBell isMobile={true} />
                </div>
                {/* Location Input - Mobile */}
                <div className="mt-3 flex gap-2">
                    <div className="flex-1 relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            placeholder="Enter your location"
                            className="w-full pl-10 pr-4 py-2 bg-[#5D5D5D] border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:border-[#E34F2C] focus:outline-none"
                        />
                    </div>
                    <button className="bg-gradient-to-b from-[#E97451] to-[#E34F2C] px-4 py-2 rounded-lg transition-colors">
                        <Search className="h-4 w-4" />
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={closeMobileMenu} />
                    <div className="fixed left-0 top-0 h-full w-80 bg-[#313131] text-white">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-b from-[#E97451] to-[#E34F2C] rounded-full flex items-center justify-center text-white font-bold">
                                        U
                                    </div>
                                    <div>
                                        <p className="font-medium">Welcome!</p>
                                        <p className="text-sm text-gray-400">Sign in to continue</p>
                                    </div>
                                </div>
                                <button onClick={closeMobileMenu} className="text-white p-2 rounded-lg">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            {/* Navigation */}
                            <div className="flex-1 p-4">
                                <NavigationLinks isMobile={true} />
                                <div className="border-t border-gray-600 my-6"></div>
                                <div className="space-y-3">
                                    <SavedPropertiesButton isMobile={true} />
                                    <PostPropertyButton isMobile={true} />
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="p-4 border-t border-gray-700">
                                <button className="w-full border border-gray-600 text-white bg-transparent py-3 px-3 rounded-lg transition-colors flex items-center justify-center">
                                    <User className="h-4 w-4 mr-3" />
                                    Sign In / Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Navbar */}
            <nav className="hidden lg:flex bg-[#313131] text-white px-16 py-4 items-center justify-between border-b border-gray-600 ">
                {/* Left side - Logo and Navigation */}
                <div className="flex items-center space-x-8">
                    <Logo />
                    <NavigationLinks />
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center space-x-2">
                    <NotificationBell />
                    <SavedPropertiesButton />
                    <PostPropertyButton />
                    <SignInButton />
                </div>
            </nav>

            {/* Click outside to close dropdowns */}
            {showNotifications && <div className="fixed inset-0 z-40" onClick={closeDropdowns} />}
        </>
    )
}

export default Navbar
