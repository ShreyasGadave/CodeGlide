import { useRef } from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import Icon from "../Icon/AppIcon";
import SplitText from "@/ReactBits/SplitText/SplitText";


// 🎈 Custom Floating Elements
const FloatingElement = ({ top, left, size, color, blur, delay, rotate }) => (
  


  <motion.div
    className={`absolute rounded-full ${blur ? "backdrop-blur-md" : ""}`}
    style={{
      top,
      left,
      width: size,
      height: size,
      background: color,
      filter: blur ? "blur(20px)" : "none",
      opacity: 0.3,
    }}
    initial={{ y: 0, rotate: 0 }}
    animate={{ y: [0, -30, 0], rotate: rotate ? [0, 360, 0] : 0 }}
    transition={{
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    }}
  />
);

const HeroSection = () => {
  const parallaxRef = useRef(null);

  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen w-screen  inset-0 text-center overflow-hidden"
      ref={parallaxRef}
    >
      {/* 🌟 Floating Elements */}
      <FloatingElement
        top="10%"
        left="15%"
        size="100px"
        color="#2086D7"
        delay={0}
        blur
      />
      <FloatingElement
        top="25%"
        left="70%"
        size="80px"
        color="#00CDD7"
        delay={1}
        rotate
      />
      <FloatingElement
        top="60%"
        left="40%"
        size="60px"
        color="#FFF045"
        delay={1.5}
        blur
      />
        <FloatingElement
        top="60%"
        left="40%"
        size="60px"
        color="#FFF045"
        delay={1.5}
        blur
      />
      <FloatingElement
        top="70%"
        left="20%"
        size="90px"
        color="#FFF045"
        delay={2}
        rotate
      />
      <FloatingElement
        top="80%"
        left="80%"
        size="50px"
        color="#00CDD7"
        delay={2.5}
        blur
      />
      <FloatingElement
        top="40%"
        left="50%"
        size="70px"
        color="#00FA9A"
        delay={3}
        rotate
      />
      <FloatingElement
        top="20%"
        left="85%"
        size="60px"
        color="#FFF045"
        delay={1.2}
        blur
      />

      {/* 🌈 Hero Text */}
      {/* <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto p-6"
      >
        <h1 className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 text-transparent bg-clip-text leading-tight animate-pulse">
          <ReactTyped
            className="font-bold"
            strings={["Elevate", "Optimize", "Conquer"]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="text-xl font-bold sm:text-3xl text-gray-800 max-w-2xl mt-6 shadow-lg p-4 bg-white bg-opacity-40 rounded-lg backdrop-blur-md"
        >
          A comprehensive platform for developers to monitor progress, visualize achievements, and connect with the coding community. <br />
          <span className="inline-block relative text-center">
            <span className="relative z-20 text-blue-500 font-extrabold text-2xl tracking-wide drop-shadow-lg">
              Code<span className="text-pink-500">Minder</span>
            </span>
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              src={curveImg}
              className="absolute top-full left-1 transform -translate-x-1/2 w-36"
              width="170"
              height="20"
              alt="Curve"
            />
          </span>
        </motion.p>
      </motion.div> */}
          <div className="inline-flex mb-10 items-center space-x-2 text-indigo-500 px-4 py-2 rounded-full text-sm font-medium ">
            <Icon name="Sparkles" size={16} />
            <span>Join 50,000+ developers on their coding journey</span>
          </div>
   <SplitText/>
      <h3 className="text-2xl font-medium text-gray-400 text-center max-w-lg mt-2">
        Codo
        <span class="bg-gradient-to-r from-[#FFF045] via-[#00CDD7] to-[#2086D7] bg-clip-text text-transparent">
          Glide 
        </span>{" "}
         helps you navigate and track your coding journey to success
      </h3>
      {/* 🚀 Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        className="relative z-10 mt-10 flex flex-wrap justify-center gap-8"
      >
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          href="/question-tracker"
          className="px-8 py-2 text-xl font-medium text-gray-500 border border-gray-300 rounded-lg  hover:text-gray-600 transition ease-out shadow-lg bg-transparent backdrop-blur-lg"
        >
          Question Tracker
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.1}}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          href="/profile"
          className="px-8 py-2  text-xl font-medium text-gray-500 bg-gradient-to-r from-[#FFF045]/50 via-[#00CDD7]/50 to-[#2086D7]/50 rounded-lg flex items-center gap-2 transition shadow-lg"
        >
          Profile Tracker
        </motion.a>
        
      </motion.div>
        <div className="flex mt-10 flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>50+ Active Developers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} />
              <span>85% Career Advancement Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} />
              <span>Industry Recognized</span>
            </div>
          </div>
       
     

    </section>
  );
};

export default HeroSection;
