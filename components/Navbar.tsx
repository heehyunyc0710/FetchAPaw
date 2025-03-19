"use client";
import { useAuth } from "@/contexts/AuthContext";
import { customToast } from "@/utils/handleError";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AboutButton } from "./modals/about/AboutButton";
import AboutModal from "./modals/about/AboutModal";
import { LoginButton } from "./modals/auth/LoginButton";
import { LoginModal } from "./modals/auth/LoginModal";
import ContactModal from "./modals/ContactModal";
const Navbar: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const currentPath = usePathname();
  const handleLogout = async () => {
    await logout();
    customToast("Logout successful", "See you next time!", "success");
   
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="container mx-auto mt-5 py-8 px-4 md:px-0 "
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-2">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/main-logo.png"
              alt="FetchAPaw"
              width={220}
              height={100}
              className="w-[180px] md:w-[220px]"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2 md:space-x-4 text-sm md:text-base">
          {currentPath !== "/" && (
            <Link
              href="/"
              className="p-0 px-2 md:px-4 rounded transition-colors cursor-pointer hover:font-semibold"
            >
              Home
            </Link>
          )}
          <AboutButton onClick={() => setAboutModalOpen(true)} />
          <p
            onClick={() => setContactModalOpen(true)}
            className="p-0 px-2 md:px-4 rounded transition-colors cursor-pointer hover:font-semibold"
          >
            Contact
          </p>
          {user && currentPath !== "/search" && (
            <p
              onClick={() => router.push("/search")}
              className="p-0 px-2 md:px-4 rounded transition-colors cursor-pointer hover:font-semibold"
            >
              Search
            </p>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center flex-wrap justify-center gap-2">
          {!user && <LoginButton onClick={() => setLoginModalOpen(true)} />}
          {user && (
            <>
              <p className="text-sm md:text-md md:mr-4">Welcome, {user.name}</p>
              <button
                className="cursor-pointer bg-yellow-500 text-zinc-700 rounded-full px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        isNav={true}
      />
      {aboutModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full">
          <AboutModal
            aboutModalOpen={aboutModalOpen}
            setAboutModalOpen={setAboutModalOpen}
          />
        </div>
      )}
      {contactModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full">
          <ContactModal
            contactModalOpen={contactModalOpen}
            setContactModalOpen={setContactModalOpen}
          />
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
