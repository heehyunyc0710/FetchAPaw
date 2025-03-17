"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import { LoginModal } from "@/components/modals/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { PawPrint } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
const LandingPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const router = useRouter();

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
          className="md:h-[calc(100vh-200px)] justify-center items-center container mx-auto flex flex-col md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageLoading ? 0 : 1, y: pageLoading ? 20 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {!user && loginModalOpen && (
            <LoginModal
              loginModalOpen={loginModalOpen}
              setLoginModalOpen={setLoginModalOpen}
              isNav={true}
            />
          )}
          <div
            id="slogan"
            className="flex flex-col gap-4 w-full md:w-1/2 h-[55%] justify-between items-center md:items-start"
          >
            <div className="text-center md:text-left">
              <h2 className="lg:text-8xl md:text-5xl text-3xl font-bold text-yellow-500 capitalize md:mb-8 mb-4">
                Paws in need,
              </h2>
              <h2 className="lg:text-6xl md:text-4xl text-2xl font-bold text-yellow-500 capitalize">
                hearts to feed.
              </h2>
            </div>

            <div className="flex items-center gap-2 font-bold color-primary hover:scale-105 transition-all duration-400">
              {!user && (
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
                  className="cursor-pointer md:text-xl text-sm bg-yellow-500 text-zinc-700 rounded-full p-2 md:p-4"
                >
                  Feed a
                  <i
                    className="fa-solid fa-bone fa-xl mx-1 md:mx-2"
                    style={{ transform: "rotate(-15deg)" }}
                  ></i>
                  today
                </motion.p>
              )}
              {user && (
                <div
                  onClick={() => router.push("/search")}
                  className="flex items-center gap-2 cursor-pointer text-lg md:text-2xl  font-bold color-primary hover:scale-101 transition-all duration-400 mt-10 whitespace-nowrap"
                >
                  Find your
                  <div className="flex items-center gap-1">
                    <PawPrint />
                    fect
                  </div>
                  match here
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center w-1/3">
            <Image
              src="/images/dog.png"
              alt="landing-image"
              width={500}
              height={500}
              className="object-contain w-full h-auto"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LandingPage;
