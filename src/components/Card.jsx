import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

 function ThreeDCardDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {cardData.map((card, index) => (
        <CardContainer key={index} className="inter-var">
          <CardBody className={cn(
            "bg-white relative group/card dark:hover:shadow-2xl dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[24rem] h-auto rounded-xl p-6 border",
            "hover:shadow-xl transition-all duration-300 ease-in-out",
            "hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
            "group-hover:before:absolute group-hover:before:w-full group-hover:before:h-full group-hover:before:inset-0",
            "group-hover:before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),rgba(0,255,0,0.1),rgba(0,0,255,0.1))]",
            "group-hover:before:opacity-100 group-hover:before:transition-opacity group-hover:before:duration-500"
          )}>
            {/* ... rest of the CardBody content ... */}
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
  // ... other card data objects ...
];
