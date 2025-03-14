"use client";
import { handleLogin } from "@/utils/authentication";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
const Navbar: React.FC = () => {
  return (
    <header className="mx-auto mt-5 px-6 py-8 flex items-center justify-between relative z-10">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center">
          {/* <h2 className="text-5xl font-bold color-primary nerko-one-regular ">FetchAPaw</h2> */}
          <Image src="/images/main-logo.png" alt="FetchAPaw" width={220} height={100} />
        </Link>
      </motion.div>
      <motion.div
        className="items-center space-x-4 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        }}
      >
        <motion.div
          className="flex items-center mr-20 text-lg  gap-4 text-zinc-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1,
            },
          }}
        >
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
        </motion.div>
      </motion.div>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleLogin}
            className="btn-login" >
            Login
          </button>
        </motion.div>
    </header>
  );
};

export default Navbar;
