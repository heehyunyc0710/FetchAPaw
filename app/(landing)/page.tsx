"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Loader from "@/components/Loader";
import { handleLogin } from "@/utils/authentication";
import Script from "next/script";
import Image from "next/image";
const LandingPage = () => {
  const [pageLoading, setPageLoading] = useState(true);

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
            className=" flex flex-col gap-4 w-full h-[50%] justify-between items-start"
          >
            <div>
              <h2 className="text-8xl font-bold text-[#FFD700] capitalize mb-6">
                Paws in need,
              </h2>
              <h2 className="text-7xl font-bold text-[#FFD700] capitalize">
                hearts to feed.
              </h2>
            </div>
            <div className="flex items-center gap-2  font-bold color-primary">
              <motion.p
                animate={{
                  // jumping 3 times and stop
                  y: [0, -10, 0],
                  transition: {
                    duration: 1,
                    ease: "linear",
                    repeat: 2,
                  },
                }}
                onClick={handleLogin}
                className="underline cursor-pointer text-2xl"
              >
                Feed a <i className="fa-solid fa-bone fa-2xl " style={{ transform: 'rotate(-15deg)' }}></i>
              today
              </motion.p>
             
            </div>
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
