"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[78vh] flex flex-col items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <Image
          src="/images/404.png"
          alt="Lost dog"
          width={300}
          height={300}
          className="mx-auto mb-8"
        />

        <h1 className="text-6xl font-bold text-yellow-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Oops!

          Looks like we failed to fetch this paw.
        </h2>

        <Link
          href="/"
          className="bg-yellow-500 text-zinc-700 px-6 py-3 rounded-full font-medium hover:bg-yellow-600 transition-colors"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
