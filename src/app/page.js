"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { Cover } from "@/components/cover";
import { FlipWords } from "@/components/flip-words"; // Add this import

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-400">
          My<span className="text-white">ToDo</span>
        </div>
        <nav>
          <Link href="/auth" className="bg-white text-black font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-white mb-4"
          >
            
              Complete your daily tasks with <span className="text-blue-400">My</span>ToDo in <Cover>Lighting Fast</Cover>
           
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            MyToDo helps you create, manage, and optimize your daily tasks in a modern way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            
              <Link href="/auth" className=" bg-white text-black font-bold py-3 px-6 rounded-full text-lg">
                Get Started
              </Link>
            
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <ThreeDCardDemo />
        </motion.div>
      </main>
      <footer className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 MyToDo. Developed by Sabari</p>
        </div>
      </footer>
    </div>
  );
}

function ThreeDCardDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {cardData.map((card, index) => (
        <CardContainer key={index} className="inter-var">
          <CardBody className={cn(
            "bg-black relative group/card dark:hover:shadow-2xl border-white/[0.2] w-auto sm:w-[24rem] h-auto rounded-xl p-6 border",
            "hover:shadow-xl transition-all duration-300 ease-in-out",
            "hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
            "group-hover:before:absolute group-hover:before:w-full group-hover:before:h-full group-hover:before:inset-0",
            "group-hover:before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),rgba(0,255,0,0.1),rgba(0,0,255,0.1))]",
            "group-hover:before:opacity-100 group-hover:before:transition-opacity group-hover:before:duration-500"
          )}>
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-white"
            >
              {card.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-gray-300 text-sm max-w-sm mt-2"
            >
              {card.description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <div className="bg-black border border-gray-500 h-60 w-full rounded-xl p-4 flex flex-col justify-center items-center text-white">
                <h3 className="text-2xl font-bold mb-2">{card.featureTitle}</h3>
                <ul className="list-disc list-inside text-sm">
                  {card.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal text-white"
              >
                Learn More →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
              >
                {card.ctaText}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}

const cardData = [
  {
    title: "Organize Your Day with MyToDo",
    description: "Experience the power of efficient task management with our intuitive interface",
    featureTitle: "Key Features",
    features: [
      "Create and organize tasks",
      "Set priorities and deadlines",
      "Track your progress",
      "Collaborate with team members",
      "Sync across all your devices",
    ],
    ctaText: "Sign Up",
  },
  {
    title: "Boost Your Productivity",
    description: "Maximize your efficiency and achieve more with our advanced productivity tools",
    featureTitle: "Productivity Tools",
    features: [
      "Time tracking",
      "Pomodoro technique",
      "Goal setting",
      "Performance analytics",
      "Habit formation",
    ],
    ctaText: "Try Now",
  },
  {
    title: "Seamless Team Collaboration",
    description: "Work together effortlessly with your team using our collaborative features",
    featureTitle: "Collaboration Features",
    features: [
      "Shared task lists",
      "Real-time updates",
      "Team chat",
      "File sharing",
      "Role-based access control",
    ],
    ctaText: "Start Collaborating",
  },
];