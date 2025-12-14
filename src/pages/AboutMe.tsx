import { motion } from "framer-motion";
import { Code2, Database, Rocket, Heart } from "lucide-react";
import FaustoPhoto from "../assets/fausto-perfil.jpg";

export default function AboutMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const profileCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      id="sobre-mi"
      className="
        relative min-h-screen flex flex-col justify-center
        py-24 px-6 overflow-hidden
        bg-white dark:bg-slate-950
        transition-colors duration-300
      "
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Sobre <span className="text-indigo-500">Mí</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Más que código, creo soluciones. Aquí tienes un vistazo a quién soy y cómo trabajo.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* COLUMNA IZQUIERDA */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* PERFIL */}
            <motion.div
              variants={profileCardVariants}
              className="
                flex flex-col sm:flex-row gap-6 items-center sm:items-start
                p-6 rounded-2xl
                bg-slate-100 dark:bg-slate-900/70
                border border-slate-200 dark:border-slate-700/50
                shadow-xl
              "
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-300 dark:border-slate-700 ring-4 ring-indigo-500/40">
                <img
                  src={FaustoPhoto}
                  alt="Foto de Fausto"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                  ¡Hola! Soy Fausto.
                </h3>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-sm font-semibold">
                  Desarrollador Full Stack
                </span>

                <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm">
                  Enfocado en crear experiencias web rápidas y escalables.
                </p>
              </div>
            </motion.div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
              Mi compromiso con la <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                innovación tecnológica
              </span>
            </h3>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              Mi nombre es <strong>Fausto</strong>. Comencé mi viaje en la programación
              por curiosidad y se convirtió en mi obsesión profesional.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              Cuando no estoy programando, exploro nuevas tecnologías y optimizo
              soluciones para hacerlas simples y eficientes.
            </p>

            {/* Stats */}
            <div className="flex gap-6 pt-4">
              <div className="border-l-2 border-indigo-500 pl-4">
              <span className="block text-2xl font-bold">∞</span>
              <span className="text-sm">Aprendizaje continuo</span>

              </div>
              <div className="border-l-2 border-purple-500 pl-4">
                <span className="block text-2xl font-bold text-slate-900 dark:text-white">100%</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">Compromiso</span>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Code2 size={30} />}
              title="Frontend"
              desc="Interfaces modernas, animaciones y UX cuidada con React y Tailwind."
            />
            <FeatureCard
              icon={<Database size={30} />}
              title="Backend"
              desc="APIs robustas y bases de datos optimizadas con Node.js."
            />
            <FeatureCard
              icon={<Rocket size={30} />}
              title="Performance"
              desc="Aplicaciones rápidas, SEO friendly y escalables."
            />
            <FeatureCard
              icon={<Heart size={30} />}
              title="Pasión"
              desc="Aprendizaje constante y amor por la tecnología."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      whileHover={{ y: -6 }}
      className="
        p-6 rounded-2xl
        bg-slate-100 dark:bg-slate-900/50
        border border-slate-200 dark:border-slate-800
        transition
      "
    >
      <div className="mb-4 text-indigo-500">{icon}</div>
      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
