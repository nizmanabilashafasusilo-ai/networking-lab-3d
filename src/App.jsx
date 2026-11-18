import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/views/HomeView';
import ExplorerView from './components/views/ExplorerView';
import SimulatorView from './components/views/SimulatorView';
import ComparisonView from './components/views/ComparisonView';
import QuizView from './components/views/QuizView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDeviceId, setSelectedDeviceId] = useState('lan');

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-cyan-500 selection:text-navy-950">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
            setSelectedDeviceId={setSelectedDeviceId} 
          />
        )}
        {activeTab === 'explorer' && (
          <ExplorerView 
            selectedDeviceId={selectedDeviceId} 
            setSelectedDeviceId={setSelectedDeviceId} 
          />
        )}
        {activeTab === 'simulator' && (
          <SimulatorView />
        )}
        {activeTab === 'comparison' && (
          <ComparisonView />
        )}
        {activeTab === 'quiz' && (
          <QuizView />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
