"use client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoginButton } from "./modals/LoginButton";
import { LoginModal } from "./modals/LoginModal";
import AboutModal from "./modals/AboutModal";
import { AboutButton } from "./modals/AboutButton";
import ContactModal from "./modals/ContactModal";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
const Navbar: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const currentPath = usePathname();
  const handleLogout = async () => {
    await logout();
    toast("Logout successful", {
      description: "See you next time!",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Undo"),
      },
    })
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="container mx-auto mt-5  py-8 flex items-center justify-between relative "
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          {/* <h2 className="text-5xl font-bold color-primary nerko-one-regular ">FetchAPaw</h2> */}
          <Image
            src="/images/main-logo.png"
            alt="FetchAPaw"
            width={220}
            height={100}
          />
        </Link>
      </div>
      <div className="items-center space-x-4 flex justify-center">
        {currentPath !== "/" && (
          <Link
            href="/"
            className="p-0 px-4 rounded  transition-colors  cursor-pointer hover:font-semibold"
          >
            Home
          </Link>
        )}
        <AboutButton onClick={() => setAboutModalOpen(true)} />
        <p
          onClick={() => setContactModalOpen(true)}
          className="p-0   px-4  rounded  transition-colors  cursor-pointer hover:font-semibold"
        >
          Contact
        </p>
        {user && currentPath !== "/search" && (
          <p
            onClick={() => router.push("/search")}
            className="p-0   px-4  rounded  transition-colors  cursor-pointer hover:font-semibold"
          >
            Search
          </p>
        )}
      </div>
      <div className="flex items-center">
        {!user && <LoginButton onClick={() => setLoginModalOpen(true)} />}
        {user && (
          <>
            <p className="mr-4 text-md">Welcome, {user.name}</p>
            <button
              className=" cursor-pointer bg-yellow-500 text-zinc-700 rounded-full px-4 py-2"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
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
