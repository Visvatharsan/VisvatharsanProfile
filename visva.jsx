import React, { useState, useEffect } from 'react';
import { 
  Terminal, Cpu, Layout, Cloud, Code2, 
  ExternalLink, Github, Mail, Phone, 
  Award, BookOpen, ChevronRight, Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <span className="text-xl font-mono font-bold tracking-tighter text-cyan-500">
        VISVATHARSAN.SYS
      </span>
      <div className="hidden md:flex space-x-8 text-sm font-mono text-slate-400">
        {['Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
            {`// ${item}`}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const [text, setText] = useState('');
  const roles = ["Full-Stack Developer", "Cloud Architect", "ML Enthusiast", "F1 Fanatic"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section className="relative min-h-screen pt-20 flex items-center bg-slate-950 font-mono overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>SYSTEM_READY: VISVATHARSAN_INIT</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100">
            Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              {roles[index].substring(0, subIndex)}
            </span>
            <span className="animate-pulse text-cyan-400">|</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-xl">
            Computer Science & Engineering student focused on high-performance web systems and cloud architecture. 
          </p>

          <div className="flex gap-4">
            <a href="https://github.com/Visvatharsan" className="p-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500 transition-all">
              <Github size={20} />
            </a>
            <button className="px-6 py-3 bg-cyan-600 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-all flex items-center gap-2">
              Explore Projects <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <StatCard icon={<Cpu className="text-cyan-400" />} label="CGPA" value="8.15" detail="LPU ACADEMICS" />
          <StatCard icon={<Award className="text-purple-400" />} label="RANK" value="TOP 7" detail="ARENA HACKATHON" />
          <StatCard icon={<Zap className="text-blue-400" />} label="STREAK" value="50+" detail="LEETCODE DAYS" />
          <StatCard icon={<Terminal className="text-green-400" />} label="LANGS" value="4+" detail="C++, JAVA, PYTHON" />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value, detail }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-all">
    <div className="mb-4">{icon}</div>
    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{label}</div>
    <div className="text-3xl font-bold text-slate-100 font-mono">{value}</div>
    <div className="text-[10px] text-cyan-500/70 font-bold font-mono">{detail}</div>
  </div>
);

const ProjectCard = ({ title, desc, tech, link }) => (
  <div className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
      <ExternalLink size={20} className="text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-3 font-mono">{title}</h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed">{desc}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tech.map((t) => (
        <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
          {t}
        </span>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---

export default function Portfolio() {
  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <Navbar />
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-24 container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-mono font-bold text-cyan-400 flex items-center gap-3">
            <Layout size={28} /> // FEATURED_PROJECTS
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard 
            title="Fundraiser Planner" 
            desc="Full-stack AI platform. Integrated Gemini AI to reduce content drafting time by 60%."
            tech={['Node.js', 'MySQL', 'Gemini AI', 'Tailwind']}
          />
          <ProjectCard 
            title="Cloud Storage System" 
            desc="Architected file sharing on GCP using Compute Engine and Cloud Functions."
            tech={['GCP', 'IAM', 'Cloud Storage', 'Stackdriver']}
          />
          <ProjectCard 
            title="Supermarket Billing" 
            desc="GUI-based Java Swing app with secure MySQL authentication and query tuning."
            tech={['Java Swing', 'MySQL', 'JDBC']}
          />
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="py-24 bg-slate-900/30 border-y border-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-mono font-bold text-cyan-400 mb-12 flex items-center gap-3">
            <Code2 size={28} /> // TECH_STACK
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-slate-100 font-mono mb-4 text-sm underline decoration-cyan-500/50 underline-offset-4">LANGUAGES</h4>
              <ul className="text-slate-400 text-sm space-y-2 font-mono">
                <li>{`> C++ / C`} </li>
                <li>{`> Java`} </li>
                <li>{`> Python`} </li>
                <li>{`> JavaScript`}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-mono mb-4 text-sm underline decoration-cyan-500/50 underline-offset-4">CLOUD & TOOLS</h4>
              <ul className="text-slate-400 text-sm space-y-2 font-mono">
                <li>{`> GCP / Azure`}</li>
                <li>{`> MySQL`}</li>
                <li>{`> Git / Github`}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-mono mb-4 text-sm underline decoration-cyan-500/50 underline-offset-4">SOFT SKILLS</h4>
              <ul className="text-slate-400 text-sm space-y-2 font-mono">
                <li>{`> Leadership`}</li>
                <li>{`> Decision Making`}</li>
                <li>{`> Adaptability`}</li>
              </ul>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-lg">
              <h4 className="text-cyan-400 font-mono mb-2 text-xs">CERTIFIED</h4>
              <p className="text-xs text-slate-300 font-mono">Oracle Foundation Associate</p>
              <p className="text-xs text-slate-300 font-mono mt-2">Java & MySQL Dev</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-20 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-6 font-mono tracking-tighter">Ready to <span className="text-cyan-500">Collaborate?</span></h2>
          <div className="flex flex-wrap justify-center gap-8 text-slate-400 font-mono text-sm">
            <a href="mailto:visvatharsan6@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail size={16} /> visvatharsan6@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <Phone size={16} /> +91-8870492420
            </span>
          </div>
          <p className="mt-12 text-slate-600 text-[10px] font-mono">
            &copy; 2026 VISVATHARSAN SARAVANAN // DESIGNED FOR PERFORMANCE
          </p>
        </div>
      </footer>
    </div>
  );
}