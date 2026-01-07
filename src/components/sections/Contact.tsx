'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, AlertTriangle, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { MagneticInput } from '@/components/ui/MagneticInput';
import { MintBlockButton } from '@/components/ui/MintBlockButton';
import { sendContactEmail, ContactState } from '@/app/actions/contact';

const startState: ContactState = { success: false, error: '' };

const Contact = () => {
  const [state, formAction, isPending] = useActionState(sendContactEmail, startState);

  // Keep track of values for preserving input on error (optional, or just let browser handle native form data)
  // For controlled inputs in React 19 server actions, typically we rely on `defaultValue` unless we need client-side logic.
  // We'll rely on browser default behavior + key reset on success.

  const [initialValues, setInitialValues] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (state.success) {
      // Reset form potentially? Ref could be better but setState triggers re-render 
      // which might be needed for the success animation state clearing
      const timer = setTimeout(() => {
        // Reset logic if needed, but the button handles the 'success' view.
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  // Mouse position for background field lines
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }


  const contactInfo = [
    { icon: Mail, label: 'SECURE_CHANNEL', value: 'jsphere16@gmail.com', href: 'mailto:jsphere16@gmail.com' },
    { icon: Phone, label: 'VOICE_LINK', value: '+(91)-8073671781', href: 'tel:+918073671781' },
    { icon: MapPin, label: 'BASE_COORDS', value: 'Bangalore, MK', href: null },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-32 overflow-hidden bg-deep-void selection:bg-electric-cyan selection:text-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background: Magnetic Field Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                    linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                    linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
                `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }}
        />
        {/* Dynamic Halo following mouse */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--electric-cyan), transparent 80%)`,
            inset: 0
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-6 h-6 text-electric-cyan animate-pulse" />
            <span className="font-mono text-electric-cyan tracking-widest text-sm">SECURE_TRANSMISSION_PROTOCOL</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-sans text-white tracking-tighter uppercase">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-600">Uplink</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-mono">
            Establish a direct cryptographic connection. All messages are hashed and immutable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Terminal Frame */}
            <div className="absolute inset-0 bg-tungsten/50 backdrop-blur-sm -skew-x-2 rounded-xl border border-slate-700/50" />

            <form action={formAction} className="relative z-10 p-8 space-y-8 bg-black/40 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-slate-500">TERMINAL_ID: 8X-29A</span>
              </div>

              {state.error && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 rounded flex items-center gap-2 text-red-400 text-sm font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  {state.error}
                </div>
              )}

              <MagneticInput
                label="AGENT_ID (NAME)"
                id="name"
                name="name"
                defaultValue={initialValues?.name}
                placeholder="ENTER_IDENTIFIER"
                error={state.fieldErrors?.name?.[0]}
                required
              />

              <MagneticInput
                label="COMMS_LINK (EMAIL)"
                id="email"
                type="email"
                name="email"
                defaultValue={initialValues?.email}
                placeholder="ENTER_SECURE_EMAIL"
                error={state.fieldErrors?.email?.[0]}
                required
              />

              <MagneticInput
                label="PAYLOAD (MESSAGE)"
                id="message"
                type="textarea"
                name="message"
                defaultValue={initialValues?.message}
                placeholder="ENTER_ENCRYPTED_DATA..."
                error={state.fieldErrors?.message?.[0]}
                required
              />

              <div className="pt-4">
                <MintBlockButton
                  isSubmitting={isPending}
                  isSuccess={state.success || false}
                />
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 pt-4 border-t border-slate-800">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-electric-cyan" />
                  ENCRYPTION: AES-256
                </span>
                <span>LATENCY: {isPending ? '---' : '12ms'}</span>
              </div>
            </form>
          </motion.div>

          {/* Contact Info & Holographic Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Info Cards */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8 font-mono tracking-widest flex items-center gap-4">
                <span className="w-8 h-[2px] bg-electric-cyan" />
                NOISE_CHANNELS
              </h3>

              {contactInfo.map((item, idx) => (
                <div key={item.label} className="group flex items-center gap-6 p-6 bg-tungsten/30 border border-slate-800 rounded-lg hover:border-electric-cyan/50 hover:bg-tungsten/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-deep-void border border-slate-700 rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all">
                    <item.icon className="w-6 h-6 text-slate-400 group-hover:text-electric-cyan transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-electric-cyan mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg text-slate-300 hover:text-white transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg text-slate-300 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* System Status Hologram */}
            <div className="relative p-8 bg-gradient-to-b from-slate-900/50 to-transparent border border-slate-800 rounded-xl overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-cyan/50 to-transparent opacity-50" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-green-500 text-sm tracking-widest">SYSTEM_ONLINE</span>
                </div>

                <div className="space-y-2 font-mono text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>UPTIME</span>
                    <span className="text-slate-300">99.98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NODES_ACTIVE</span>
                    <span className="text-slate-300">8,421</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LAST_BLOCK</span>
                    <span className="text-slate-300">#93,420</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    "The network is always listening. Every message is a transaction of intent. Broadcast yours."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;