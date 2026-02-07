import { Incident } from '../data/mockData';
import { StatusBadge, UrgencyBadge, ConfidenceBadge } from './StatusBadge';
import { Flame, Droplets, Stethoscope, LifeBuoy, Users, MapPin, Clock } from 'lucide-react';

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

export function IncidentCard({ incident, onClick }: IncidentCardProps) {
  const iconMap = {
    Fire: Flame,
    Flood: Droplets,
    Medical: Stethoscope,
    Rescue: LifeBuoy,
  };

  const Icon = iconMap[incident.type];
  
  const typeColors = {
    Fire: 'text-orange-600',
    Flood: 'text-blue-600',
    Medical: 'text-red-600',
    Rescue: 'text-purple-600',
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-slate-50 ${typeColors[incident.type]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-slate-600">{incident.id}</div>
            <div className="font-medium text-slate-900">{incident.type} Emergency</div>
          </div>
        </div>
        <UrgencyBadge level={incident.urgency} />
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-slate-900">{incident.location}</div>
            <ConfidenceBadge level={incident.locationConfidence} label="Location" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{formatTime(incident.timestamp)}</span>
        </div>

        {incident.estimatedPeople && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="w-4 h-4 text-slate-400" />
            <span>~{incident.estimatedPeople} people affected</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500">Reports:</div>
          <div className="px-2 py-1 bg-slate-100 text-slate-900 rounded text-xs font-medium">
            {incident.reportCount}
          </div>
        </div>
        <StatusBadge status={incident.status} />
      </div>
    </div>
  );
}
