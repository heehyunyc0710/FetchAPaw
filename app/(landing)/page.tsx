"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import Image from "next/image";
import Script from "next/script";
import { LoginModal } from "@/components/LoginModal";
const LandingPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadScript = () => {
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    loadScript();
  }, []);

  return (
    <>
      <Script src="https://kit.fontawesome.com/3d72938be8.js" />
      {pageLoading && <Loader />}

      {!pageLoading && (
        <motion.div
          className=" h-[calc(100vh-200px)] flex justify-center items-center px-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageLoading ? 0 : 1, y: pageLoading ? 20 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            id="slogan"
            className=" flex flex-col gap-4 w-full h-[55%] justify-between items-start"
          >
            <div>
              <h2 className="text-8xl font-bold text-yellow-500 capitalize mb-6">
                Paws in need,
              </h2>
              <h2 className="text-7xl font-bold text-yellow-500 capitalize">
                hearts to feed.
              </h2>
            </div>
            <div className="flex items-center gap-2  font-bold color-primary hover:scale-105 transition-all duration-400">
              <motion.p
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 1,
                    ease: "linear",
                    repeat: 2,
                  },
                }}
                onClick={() => setLoginModalOpen(true)}
                className=" cursor-pointer text-xl   bg-yellow-500 text-zinc-700 rounded-full p-4"
              >
                Feed a
                <i
                  className="fa-solid fa-bone fa-2xl mx-2  "
                  style={{ transform: "rotate(-15deg)" }}
                ></i>
                today
              </motion.p>
            </div>
            <LoginModal
              loginModalOpen={loginModalOpen}
              setLoginModalOpen={setLoginModalOpen}
            />
          </div>

          <Image
            src="/images/dog.png"
            alt="landing-image"
            width={500}
            height={500}
          />
        </motion.div>
      )}
    </>
  );
};

export default LandingPage;
