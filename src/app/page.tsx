import Link from 'next/link';
import { ArrowRight, BarChart3, PieChart, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <span>Springer<span className="text-indigo-600">Dash</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Products</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <Link 
            href="/dashboard"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Launch Dashboard
          </Link>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-8 animate-fade-in">
            <Zap size={14} fill="currentColor" />
            <span>POWERED BY NEXT.JS 15</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            Data visualization for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">modern enterprise.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
            SpringerDash provides deep insights into your sales performance with atomic structural principles and beautiful dynamic charts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>
        </section>

        <section className="bg-slate-50 py-24 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: PieChart, title: 'Dynamic Charts', desc: 'Switch between Bar, Line, and Pie charts instantly to see your data from every angle.' },
              { icon: ShieldCheck, title: 'Secure Insights', desc: 'Your data is handled with enterprise-grade security and atomic structural logic.' },
              { icon: BarChart3, title: 'Multi-Year Support', desc: 'Analyze trends across fiscal years 2022, 2023, and 2024 with seamless transitions.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 mb-6 text-indigo-600">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
