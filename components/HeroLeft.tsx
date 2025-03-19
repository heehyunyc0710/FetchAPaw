import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import { HeroLeftProps } from "@/types";
import { useRouter } from "next/navigation";



const HeroLeft = ({ user, setLoginModalOpen }: HeroLeftProps) => {
  const router = useRouter();
  return (
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

      <div className="flex items-center gap-2 font-bold color-primary hover:scale-105 transition-all duration-400 mt-6">
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
            Help a pup
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
            className="flex items-center gap-2 cursor-pointer text-lg md:text-2xl font-bold color-primary hover:scale-101 transition-all duration-400 mt-10 whitespace-nowrap"
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
  );
};

export default HeroLeft;
