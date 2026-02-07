import { mockIncidents, dashboardStats, Incident } from '../data/mockData';
import { IncidentCard } from './IncidentCard';
import { AlertTriangle, MessageSquare, ClipboardCheck, Activity } from 'lucide-react';

interface IncidentOverviewProps {
  onSelectIncident: (incident: Incident) => void;
}

export function IncidentOverview({ onSelectIncident }: IncidentOverviewProps) {
  const stats = [
    {
      label: 'Total Active Incidents',
      value: dashboardStats.totalActiveIncidents,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Critical Alerts',
      value: dashboardStats.criticalAlerts,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Messages Processed',
      value: dashboardStats.messagesProcessed,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Pending Verifications',
      value: dashboardStats.pendingVerifications,
      icon: ClipboardCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-slate-200 rounded-lg p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                <div className="text-3xl font-semibold text-slate-900">{stat.value}</div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Cards */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Active Incidents</h2>
          <p className="text-sm text-slate-600">Click on an incident to view details and assign resources</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockIncidents
            .filter((inc) => inc.status !== 'Resolved')
            .map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onClick={() => onSelectIncident(incident)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
