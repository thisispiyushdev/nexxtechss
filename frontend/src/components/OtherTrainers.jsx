import React from 'react';

const trainersList = [
  { name: "Aditya Sharma (Cloud)", role: "Cloud Computing", path: "/best-cloud-computing-trainer-in-delhi" },
  { name: "Aditya Sharma (DevOps)", role: "DevOps & SRE", path: "/best-devops-trainer-in-delhi" },
  { name: "Sagar Sir", role: "Digital Marketing", path: "/best-digital-marketing-trainer-in-delhi" },
  { name: "Meghesh Kumar", role: "Cyber Security", path: "/best-cyber-security-trainer-in-delhi" },
  { name: "Suraj Rewadia", role: "UI/UX & Graphic Design", path: "/best-graphic-design-trainer-in-delhi" },
  { name: "Niti Gupta Mam", role: "Personal Development", path: "/best-personal-development-trainer-in-delhi" },
  { name: "Saba Hussain", role: "Data Science", path: "/best-data-science-trainer-in-delhi" },
];

export default function OtherTrainers({ currentTrainerPath }) {
  const filteredTrainers = trainersList.filter(t => t.path !== currentTrainerPath);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Explore Our Other Expert Trainers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrainers.map((trainer) => (
          <a 
            key={trainer.path}
            href={trainer.path} 
            className="p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#84CC16] dark:hover:border-[#84CC16] bg-gray-50 dark:bg-white/5 hover:bg-[#84CC16]/5 transition-colors group flex flex-col justify-between"
          >
            <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#84CC16] transition-colors">
              {trainer.name}
            </span>
            <span className="text-sm text-gray-500 mt-1">{trainer.role}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
