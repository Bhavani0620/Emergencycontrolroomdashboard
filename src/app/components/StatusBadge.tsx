import { IncidentStatus, UrgencyLevel, ConfidenceLevel } from '../data/mockData';

interface StatusBadgeProps {
  status: IncidentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    New: 'bg-blue-100 text-blue-800 border-blue-200',
    'In Review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Assigned: 'bg-purple-100 text-purple-800 border-purple-200',
    Resolved: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs border ${styles[status]}`}>
      {status}
    </span>
  );
}

interface UrgencyBadgeProps {
  level: UrgencyLevel;
}

export function UrgencyBadge({ level }: UrgencyBadgeProps) {
  const styles = {
    Critical: 'bg-red-600 text-white',
    High: 'bg-orange-500 text-white',
    Medium: 'bg-yellow-500 text-white',
    Low: 'bg-green-600 text-white',
  };

  return (
    <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${styles[level]}`}>
      {level}
    </span>
  );
}

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  label?: string;
}

export function ConfidenceBadge({ level, label = 'Confidence' }: ConfidenceBadgeProps) {
  const styles = {
    High: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs border ${styles[level]}`}>
      {label}: {level}
    </span>
  );
}
