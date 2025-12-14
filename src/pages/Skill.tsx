import { motion } from "framer-motion";
import {
  Cpu,
  Code,
  Layout,
  Database,
  Server,
  GitBranch,
  Shield,
  Brush
} from "lucide-react";

// Habilidades actualizadas
const skillsData = [
// Frontend
{ name: "HTML5", icon: Layout, category: "Frontend", color: "text-orange-400" },
{ name: "CSS3", icon: Brush, category: "Frontend", color: "text-blue-400" },
{ name: "React / Next.js", icon: Layout, category: "Frontend", color: "text-indigo-400" },
{ name: "TypeScript", icon: Code, category: "Frontend", color: "text-sky-400" },
{ name: "Tailwind CSS", icon: Brush, category: "Frontend", color: "text-cyan-400" },


  // Backend
  { name: "Node.js / Express", icon: Server, category: "Backend", color: "text-green-400" },
  { name: "Python / Django", icon: Cpu, category: "Backend", color: "text-yellow-400" },
 { name: "C++", icon: Cpu, category: "Backend", color: "text-sky-400" },

  // Database & Tools
  { name: "MongoDB", icon: Database, category: "Database", color: "text-lime-400" },
  { name: "MySQL", icon: Database, category: "Database", color: "text-sky-400" },
  { name: "Git / GitHub", icon: GitBranch, category: "Tools", color: "text-white" },
  { name: "Docker", icon: Shield, category: "Tools", color: "text-orange-400" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const categoryColors = {
  Frontend: "border-indigo-600/50",
  Backend: "border-green-600/50",
  Database: "border-sky-600/50",
  Tools: "border-slate-600/50",
};

export default function Skills() {
  const categories = Array.from(new Set(skillsData.map(s => s.category)));

  return (
    <section
      id="skills"
      className="py-24 px-6 min-h-screen transition-colors
        bg-slate-100 text-slate-900
        dark:bg-slate-950 dark:text-white"
    >
      <div className="max-w-6xl mx-auto">

        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16"
        >
          Mi <span className="text-indigo-500 dark:text-indigo-400">Stack</span> Tecnológico
        </motion.h2>

        {/* CONTENIDO */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-16"
        >
          {categories.map(category => (
            <div key={category}>
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-6 border-b pb-2
                  border-slate-300 dark:border-slate-800
                  text-slate-700 dark:text-slate-300"
              >
                {category}
              </motion.h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {skillsData
                  .filter(skill => skill.category === category)
                  .map(skill => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className={`
                          p-4 rounded-xl border flex items-center gap-4
                          bg-white dark:bg-slate-900/50
                          ${categoryColors[category]}
                          transition-all
                        `}
                      >
                        <Icon className={skill.color} size={28} />
                        <span className="font-medium text-lg">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
