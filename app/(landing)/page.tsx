"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import HeroRight from "@/components/HeroRight";
import Loader from "@/components/Loader";
import { LoginModal } from "@/components/modals/auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";

import HeroLeft from "@/components/HeroLeft";
import Script from "next/script";

const LandingPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
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
          {/* hero left  */}
          <HeroLeft user={user} setLoginModalOpen={setLoginModalOpen} />
          {/* hero right  */}
          <HeroRight />
        </motion.div>
      )}
    </>
  );
};

export default LandingPage;
