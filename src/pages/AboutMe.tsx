import { motion } from "framer-motion";
import { Code2, Database, Rocket, Heart, Sparkles } from "lucide-react";
import FaustoPhoto from "../assets/fausto-perfil.jpg";

/* ====== ANIMATIONS ====== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutMe() {
  return (
    <section
      id="sobre-mi"
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* TÍTULO DE SECCIÓN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            Un poco <span className="text-indigo-600 dark:text-indigo-500">sobre mí</span>
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto lg:ml-0" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >
          {/* COLUMNA IZQUIERDA: HISTORIA Y PERFIL (7 de 12) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-10">
            
            {/* TARJETA DE PERFIL FLOTANTE */}
            <div className="relative group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col sm:flex-row items-center gap-8">
              {/* Decoración detrás de la foto */}
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-20 text-indigo-600">
                <Sparkles size={40} />
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="relative w-36 h-36 rounded-[2rem] overflow-hidden border-2 border-white dark:border-slate-800 shadow-2xl">
                  <img
                    src={FaustoPhoto}
                    alt="Fausto Desch"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  ¡Hola! Soy Fausto.
                </h3>
                <p className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-sm font-bold border border-indigo-100 dark:border-indigo-500/20">
                  Desarrollador Full Stack <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-4 text-base/relaxed italic">
                  "Transformando ideas complejas en experiencias digitales memorables."
                </p>
              </div>
            </div>

            {/* TEXTO BIOGRÁFICO */}
            <div className="space-y-6 px-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Mi compromiso con la <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-cyan-400">
                  innovación y la excelencia
                </span>
              </h3>

              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Mi viaje en el mundo de la tecnología comenzó por la curiosidad de entender cómo funcionaba la web, y rápidamente se transformó en una <strong>pasión profesional por el desarrollo Full Stack</strong>.
                </p>
                <p>
                  Me especializo en construir aplicaciones que no solo funcionen a la perfección bajo el capó (Backend), sino que también deleiten al usuario final con interfaces fluidas y modernas (Frontend). 
                </p>
              </div>

              {/* STATS RÁPIDOS */}
              <div className="flex flex-wrap gap-8 pt-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-500">∞</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Aprendizaje</span>
                </div>
                <div className="w-[1px] h-12 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">100%</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Compromiso</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: FEATURE CARDS (5 de 12) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <FeatureCard
              icon={<Code2 size={28} />}
              title="Frontend UX"
              desc="Diseño interfaces intuitivas y dinámicas con React y Tailwind, priorizando la accesibilidad."
              delay={0.1}
            />
            <FeatureCard
              icon={<Database size={28} />}
              title="Backend & APIs"
              desc="Construyo arquitecturas robustas y escalables utilizando Node.js y bases de datos modernas."
              delay={0.2}
            />
            <FeatureCard
              icon={<Rocket size={28} />}
              title="Performance"
              desc="Optimizo cada línea de código para garantizar tiempos de carga mínimos y un SEO impecable."
              delay={0.3}
            />
            <FeatureCard
              icon={<Heart size={28} />}
              title="Pasión Craft"
              desc="Creo cada proyecto con atención al detalle, tratando el código como una artesanía digital."
              delay={0.4}
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
  delay
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, x: 10 }}
      className="
        group p-6 rounded-[2rem]
        bg-white dark:bg-slate-900/40
        border border-slate-200/60 dark:border-slate-800/50
        hover:border-indigo-500/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5
        transition-all duration-300
      "
    >
      <div className="mb-4 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
        {title}
      </h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}