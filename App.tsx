import React from 'react';
import { Store } from './components/Store';
import { AIAgents } from './components/AIAgents';
import { STRIPE_CHECKOUT_URL } from './constants';

// --- Shared Components (Nav, Hero, Process, About, Footer) ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-30 bg-bg/80 backdrop-blur-md border-b border-muted">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-primary">
        <div className="w-6 h-6 bg-accent rounded-sm rotate-3"></div>
        Lumina.
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-secondary">
        <a href="#process" className="hover:text-primary transition-colors">How It Works</a>
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#store" className="hover:text-primary transition-colors">Store</a>
      </div>
      <a 
        href={STRIPE_CHECKOUT_URL} 
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Book Consult
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <header className="pt-32 pb-20 px-6 relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/20 rounded-full blur-[80px] pointer-events-none"></div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-primary">
        Systems for the <span className="text-accent">New Economy</span>.
      </h1>
      <p className="text-lg md:text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
        I help freelance consultants and small businesses automate chaos, integrate AI agents, and reclaim their time.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href={STRIPE_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer" 
          className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          Book Consultation
        </a>
        <a href="#store" className="px-8 py-4 bg-white text-primary border border-muted rounded-full font-bold text-lg hover:border-accent hover:text-accent transition-all duration-300">
          View Assets
        </a>
      </div>
    </div>
  </header>
);

const Process = () => (
  <section id="process" className="py-20 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { step: '01', title: 'Audit', desc: 'I dissect your current workflow to identify bottlenecks and manual drains.' },
          { step: '02', title: 'Automate', desc: 'We implement custom AI agents (like the ones below) to handle the grunt work.' },
          { step: '03', title: 'Scale', desc: 'You get a documented operating system to grow without adding more hours.' }
        ].map((item, idx) => (
          <div key={idx} className="relative group p-6 rounded-2xl hover:bg-bg transition-colors duration-300">
            <span className="font-display text-6xl font-bold text-muted/50 absolute top-2 right-4 group-hover:text-accent/20 transition-colors">{item.step}</span>
            <div className="relative z-10 pt-8">
              <h3 className="font-display font-bold text-xl mb-3 text-primary">{item.title}</h3>
              <p className="text-secondary leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 px-6">
    <div className="max-w-4xl mx-auto bg-panel rounded-3xl p-8 md:p-12 shadow-sm border border-muted flex flex-col md:flex-row items-center gap-10">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-bg flex-shrink-0">
        <img src="https://picsum.photos/400/400?grayscale" alt="Consultant Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-display text-3xl font-bold mb-4 text-primary">Hi, I'm Alex.</h2>
        <p className="text-secondary leading-relaxed mb-6">
          Former CTO turned operations consultant. I believe the future of small business belongs to those who leverage AI responsibly. 
          My mission is to replace "hustle culture" with efficient systems. When I'm not building agents, I'm hiking the PNW.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
           {/* Decorative Social Icons - No interaction to prevent 'blank' confusion */}
           <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-colors">
             <span className="sr-only">LinkedIn</span>
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
           </div>
           <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-colors">
             <span className="sr-only">Twitter</span>
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-muted py-12 px-6 text-center">
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <div className="font-display font-bold text-xl tracking-tight mb-6 text-primary">Lumina.</div>
      <div className="flex gap-6 text-sm text-secondary mb-8">
        <span className="cursor-pointer hover:text-primary">Terms</span>
        <span className="cursor-pointer hover:text-primary">Privacy</span>
        <a href="mailto:hello@example.com" className="hover:text-primary">Contact</a>
      </div>
      <p className="text-xs text-secondary/60">
        © {new Date().getFullYear()} Lumina Consultancy. Built with React, Tailwind & Gemini AI.
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-white bg-bg text-primary">
      <Navbar />
      <Hero />
      <Process />
      <AIAgents />
      <About />
      <Store />
      <Footer />
    </div>
  );
}