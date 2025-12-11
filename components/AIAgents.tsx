import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateAgentContent } from '../services/geminiService.ts';
import { AgentTask, AgentStatus } from '../types.ts';
import { AGENT_PROMPTS } from '../constants.ts';

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"></path></svg>
);

export const AIAgents: React.FC = () => {
  const [tasks, setTasks] = useState<AgentTask[]>([
    {
      id: 'task1',
      name: 'Agent Alpha',
      description: 'Expert Book Editor',
      prompt: AGENT_PROMPTS.BOOK_OUTLINE,
      result: null,
      status: AgentStatus.IDLE
    },
    {
      id: 'task2',
      name: 'Agent Beta',
      description: 'Market Trend Analyst',
      prompt: AGENT_PROMPTS.PRODUCT_IDEAS,
      result: null,
      status: AgentStatus.IDLE
    },
    {
      id: 'task3',
      name: 'Agent Gamma',
      description: 'Growth Strategist',
      prompt: AGENT_PROMPTS.MARKETING_STRATEGY,
      result: null,
      status: AgentStatus.IDLE
    }
  ]);

  const runAgent = async (taskId: string) => {
    // Prevent running if already active to avoid duplicate requests
    const currentTask = tasks.find(t => t.id === taskId);
    if (currentTask?.status === AgentStatus.THINKING || currentTask?.status === AgentStatus.GENERATING) return;

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: AgentStatus.THINKING } : t));

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      // Simulate "Thinking" delay for UX
      await new Promise(r => setTimeout(r, 1200));
      
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: AgentStatus.GENERATING } : t));
      
      const content = await generateAgentContent(task.prompt);
      
      setTasks(prev => prev.map(t => t.id === taskId ? { 
        ...t, 
        status: AgentStatus.COMPLETED,
        result: content 
      } : t));
      
    } catch (error) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: AgentStatus.ERROR } : t));
    }
  };

  // Auto-start the first agent after a short delay to create "Nonstop" activity feel
  useEffect(() => {
    const timer = setTimeout(() => {
      runAgent('task1');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-6 bg-white border-y border-muted">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider mb-4">
            <SparkleIcon />
            <span>AI Innovation Lab</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">Multi-Agent Workforce</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Experience the power of my custom-built AI workflows. I don't just consult; I build systems that generate value nonstop.
            Select an agent below to see them in action.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <div key={task.id} className="bg-bg rounded-2xl border border-muted overflow-hidden flex flex-col h-[550px] shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="p-5 border-b border-muted bg-white flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    {task.name}
                    {task.status === AgentStatus.THINKING && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span></span>}
                  </h3>
                  <p className="text-xs text-secondary mt-1">{task.description}</p>
                </div>
                <button
                  onClick={() => runAgent(task.id)}
                  disabled={task.status === AgentStatus.THINKING || task.status === AgentStatus.GENERATING}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wide ${
                    task.status === AgentStatus.IDLE || task.status === AgentStatus.COMPLETED
                    ? 'bg-primary text-white hover:bg-accent hover:text-white' 
                    : 'bg-muted text-secondary cursor-wait'
                  }`}
                >
                  {task.status === AgentStatus.IDLE ? 'Initialize' : task.status === AgentStatus.COMPLETED ? 'Rerun' : 'Busy'}
                </button>
              </div>

              {/* Console/Output Area - Dark Theme for "Advanced" feel */}
              <div className="flex-1 overflow-y-auto p-5 font-mono text-xs bg-[#1F2937] text-gray-300 custom-scrollbar">
                {task.status === AgentStatus.IDLE && (
                   <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-3">
                     <div className="w-10 h-10 rounded-full border border-dashed border-gray-600 flex items-center justify-center">
                        <span className="animate-pulse">_</span>
                     </div>
                     <p className="text-[10px] uppercase tracking-widest">Awaiting Command</p>
                   </div>
                )}

                {task.status === AgentStatus.THINKING && (
                  <div className="space-y-2 animate-pulse font-mono">
                    <div className="flex items-center gap-2 text-accent">
                        <span>&gt; Analyzing input parameters...</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                  </div>
                )}

                {(task.status === AgentStatus.GENERATING || task.status === AgentStatus.COMPLETED) && task.result && (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">
                    <ReactMarkdown>{task.result}</ReactMarkdown>
                  </div>
                )}
                
                {task.status === AgentStatus.ERROR && (
                   <div className="text-red-400 border-l-2 border-red-500 pl-3">
                       Error: Connection failed. Check API configuration.
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};