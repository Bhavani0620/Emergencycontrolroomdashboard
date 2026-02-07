import { useState } from 'react';
import { LayoutDashboard, MessageSquare, Map, Settings, Radio } from 'lucide-react';
import { IncidentOverview } from './components/IncidentOverview';
import { MessageAnalysis } from './components/MessageAnalysis';
import { IncidentMap } from './components/IncidentMap';
import { ResourceAssignment } from './components/ResourceAssignment';
import { Incident } from './data/mockData';

type Screen = 'overview' | 'messages' | 'map' | 'resources';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('overview');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const navigation = [
    { id: 'overview' as Screen, label: 'Incident Overview', icon: LayoutDashboard },
    { id: 'messages' as Screen, label: 'AI Message Analysis', icon: MessageSquare },
    { id: 'map' as Screen, label: 'Incident Map', icon: Map },
    { id: 'resources' as Screen, label: 'Resource Assignment', icon: Settings },
  ];

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setCurrentScreen('resources');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Disaster Response AI Dashboard</h1>
                <p className="text-sm text-slate-400">Emergency Control Room - Government Operations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300">System Active</span>
              </div>
              <div className="text-sm text-slate-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 border-t border-slate-800">
          <div className="flex gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-white bg-slate-800'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-[1800px] mx-auto">
        {currentScreen === 'overview' && (
          <IncidentOverview onSelectIncident={handleSelectIncident} />
        )}
        {currentScreen === 'messages' && <MessageAnalysis />}
        {currentScreen === 'map' && <IncidentMap />}
        {currentScreen === 'resources' && (
          <ResourceAssignment selectedIncident={selectedIncident || undefined} />
        )}
      </main>
    </div>
  );
}
