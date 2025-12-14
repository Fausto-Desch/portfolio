import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

// Datos de Contacto Directo
const contactInfo = [
  { icon: Mail, label: "Email", value: "faudesch2210@gmail.com", href: "mailto:x" },
  { icon: Phone, label: "Teléfono", value: "+54 9 2923 41-4118", href: "tel:x" },
  { icon: Linkedin, label: "LinkedIn", value: "Fausto Desch", href: "https://linkedin.com/in/faustodev" },
  { icon: MapPin, label: "Ubicación", value: "Bahia Blanca provincia de Buenos Aires" },
];

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="
        py-24 px-6 min-h-screen flex items-center
        bg-slate-100 text-slate-900
        dark:bg-slate-950 dark:text-white
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            ¿Hablamos?{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Contáctame
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Estoy disponible para nuevos proyectos y colaboraciones. Envíame un mensaje o utiliza mis redes directas.
          </p>
        </motion.div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* INFO DIRECTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="
              space-y-8 p-8 rounded-xl h-full
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
            "
          >
            <h3 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
              Información Directa
            </h3>

            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <item.icon className="text-indigo-600 dark:text-indigo-400 mt-1" size={24} />
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-lg"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>

          {/* FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              lg:col-span-2 p-8 rounded-xl
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
            "
          >
            <form className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="nombre" label="Nombre Completo" type="text" required />
                <InputField id="email" label="Email" type="email" required />
              </div>

              <InputField id="asunto" label="Asunto" type="text" required />

              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tu propuesta o pregunta..."
                  className="
                    p-3 rounded-lg
                    bg-slate-100 dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    focus:border-indigo-500 focus:ring-indigo-500
                    transition-colors
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  group w-full flex items-center justify-center gap-3
                  px-6 py-3 rounded-lg
                  bg-indigo-600 text-white font-semibold text-lg
                  hover:bg-indigo-500 transition-transform
                  hover:scale-[1.01] active:scale-95
                  shadow-lg shadow-indigo-600/30
                "
              >
                Enviar Mensaje
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// INPUT
const InputField = ({ id, label, type, required }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      className="
        p-3 rounded-lg
        bg-slate-100 dark:bg-slate-800
        border border-slate-300 dark:border-slate-700
        focus:border-indigo-500 focus:ring-indigo-500
        transition-colors
      "
    />
  </div>
);
