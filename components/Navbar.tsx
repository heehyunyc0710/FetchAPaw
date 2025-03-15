"use client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoginButton } from "./LoginButton";
import { LoginModal } from "./LoginModal";

const Navbar: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mx-auto mt-5 px-6 py-8 flex items-center justify-between relative z-10"
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
        <Link
          href="/"
          className="p-0 px-4 rounded  transition-colors  cursor-pointer hover:font-semibold"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="p-0  px-4  rounded  transition-colors  cursor-pointer hover:font-semibold"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="p-0   px-4  rounded  transition-colors  cursor-pointer hover:font-semibold"
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center">
        {!user && <LoginButton onClick={() => setLoginModalOpen(true)} />}
        {user && (
          <>
            <p className="mr-4 text-md">Welcome, {user.name}</p>
            <button
              className=" cursor-pointer bg-yellow-500 text-zinc-700 rounded-full px-4 py-2"
              onClick={logout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
      <LoginModal
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
    </motion.header>
  );
};

export default Navbar;
