import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2 } from "lucide-react";

/* ====== TYPES & DATA ====== */
interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

const contactInfo: ContactItem[] = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "faudesch2210@gmail.com", 
    href: "mailto:faudesch2210@gmail.com" 
  },
  { 
    icon: Phone, 
    label: "Teléfono", 
    value: "+54 9 2923 41-4118", 
    href: "https://wa.me/5492923414118" // Mejor enviarlo a WhatsApp directamente
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    value: "Fausto Desch", 
    href: "https://www.linkedin.com/in/fausto-desch-3758a5226/" 
  },
  { 
    icon: MapPin, 
    label: "Ubicación", 
    value: "Bahía Blanca, Buenos Aires, ARG" 
  },
];

export default function Contacto() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría tu lógica de EmailJS o API
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section
      id="contacto"
      className="py-28 px-6 min-h-screen flex items-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* HEADER DE SECCIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
            ¿Tenés un proyecto? <br />
            <span className="text-indigo-600 dark:text-indigo-500">Hablemos.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Estoy disponible para freelance o posiciones full-time. Mi bandeja de entrada siempre está abierta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA INFO (4 de 12) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                Información de contacto
              </h3>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="group flex items-center gap-5"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-700 dark:text-slate-200 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-slate-700 dark:text-slate-200 font-semibold">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CAJA EXTRA (Disponibilidad) */}
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white">
              <p className="font-medium opacity-90">Estado actual:</p>
              <p className="text-2xl font-bold mt-1">Disponible para trabajar ✨</p>
            </div>
          </motion.div>

          {/* COLUMNA FORMULARIO (7 de 12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/50 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="nombre" label="¿Cómo te llamás?" placeholder="Tu nombre" type="text" required />
                <InputField id="email" label="Tu correo" placeholder="email@ejemplo.com" type="email" required />
              </div>

              <InputField id="asunto" label="Asunto" placeholder="¿En qué puedo ayudarte?" type="text" required />

              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 ml-1">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  required
                  placeholder="Hola Fausto, tengo una idea para..."
                  className="
                    w-full p-4 rounded-2xl
                    bg-slate-50 dark:bg-slate-800/50
                    border border-slate-200 dark:border-slate-700/50
                    text-slate-900 dark:text-white
                    placeholder:text-slate-400 dark:placeholder:text-slate-600
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                    transition-all resize-none
                  "
                />
              </div>

              <button
                type="submit"
                disabled={isSent}
                className={`
                  group w-full flex items-center justify-center gap-3
                  px-8 py-4 rounded-2xl
                  font-bold text-lg transition-all duration-300
                  ${isSent 
                    ? "bg-emerald-500 text-white" 
                    : "bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]"}
                `}
              >
                {isSent ? (
                  <>
                    ¡Mensaje Enviado! <CheckCircle2 size={20} />
                  </>
                ) : (
                  <>
                    Enviar Mensaje
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ====== COMPONENTE DE INPUT REUTILIZABLE ====== */
const InputField = ({ id, label, type, required, placeholder }: any) => (
  <div className="flex flex-col w-full">
    <label htmlFor={id} className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 ml-1">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      placeholder={placeholder}
      className="
        w-full p-4 rounded-2xl
        bg-slate-50 dark:bg-slate-800/50
        border border-slate-200 dark:border-slate-700/50
        text-slate-900 dark:text-white
        placeholder:text-slate-400 dark:placeholder:text-slate-600
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
        transition-all
      "
    />
  </div>
);