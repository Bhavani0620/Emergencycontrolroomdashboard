import { mockIncidents, Incident, UrgencyLevel } from '../data/mockData';
import { MapPin, Users, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import { UrgencyBadge, ConfidenceBadge, StatusBadge } from './StatusBadge';

export function IncidentMap() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const getMarkerColor = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-600 border-red-700';
      case 'High':
        return 'bg-orange-500 border-orange-600';
      case 'Medium':
        return 'bg-yellow-500 border-yellow-600';
      case 'Low':
        return 'bg-green-600 border-green-700';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate position on mock map (normalized 0-100%)
  const getPosition = (lat: number, lng: number) => {
    // Normalize coordinates to 0-100% for positioning
    const minLat = 28.4;
    const maxLat = 28.75;
    const minLng = 77.1;
    const maxLng = 77.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="space-y-4">
      {/* Map Legend */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-900">Severity Levels</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {(['Critical', 'High', 'Medium', 'Low'] as UrgencyLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full border-2 ${getMarkerColor(level)}`} />
              <span className="text-sm text-slate-700">{level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Map View */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
              <h3 className="font-medium text-slate-900">Incident Location Map</h3>
              <p className="text-sm text-slate-600">Click on markers to view incident details</p>
            </div>
            
            {/* Mock Map */}
            <div className="relative bg-slate-100 aspect-[4/3]">
              {/* Grid pattern to simulate map */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Map labels */}
              <div className="absolute inset-0 p-4 text-slate-400 text-xs pointer-events-none">
                <div className="absolute top-4 left-4">North District</div>
                <div className="absolute bottom-4 right-4">South District</div>
                <div className="absolute top-1/2 left-4">West Area</div>
                <div className="absolute top-1/2 right-4">East Area</div>
              </div>

              {/* Incident Markers */}
              {mockIncidents.filter(inc => inc.status !== 'Resolved').map((incident) => {
                const pos = getPosition(incident.coordinates.lat, incident.coordinates.lng);
                const isSelected = selectedIncident?.id === incident.id;

                return (
                  <button
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 group"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    {/* Marker */}
                    <div className="relative">
                      <div className={`w-6 h-6 rounded-full border-2 ${getMarkerColor(incident.urgency)} shadow-lg ${isSelected ? 'ring-4 ring-blue-400' : ''}`}>
                        {incident.reportCount > 1 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                            {incident.reportCount}
                          </div>
                        )}
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {incident.type} - {incident.urgency}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Incident Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
              <h3 className="font-medium text-slate-900">Incident Details</h3>
            </div>
            
            <div className="p-4">
              {selectedIncident ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Incident ID</div>
                    <div className="text-sm font-mono font-medium text-slate-900">{selectedIncident.id}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-1">Type</div>
                    <div className="text-sm font-medium text-slate-900">{selectedIncident.type} Emergency</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Urgency</div>
                    <UrgencyBadge level={selectedIncident.urgency} />
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Status</div>
                    <StatusBadge status={selectedIncident.status} />
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-1">Location</div>
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <span className="text-sm text-slate-900">{selectedIncident.location}</span>
                    </div>
                    <ConfidenceBadge level={selectedIncident.locationConfidence} />
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-1">Reported</div>
                    <div className="flex items-center gap-2 text-sm text-slate-900">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {formatTime(selectedIncident.timestamp)}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-1">Reports Clustered</div>
                    <div className="px-2 py-1 bg-slate-100 text-slate-900 rounded text-sm font-medium inline-block">
                      {selectedIncident.reportCount} messages
                    </div>
                  </div>

                  {selectedIncident.estimatedPeople && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">People Affected</div>
                      <div className="flex items-center gap-2 text-sm text-slate-900">
                        <Users className="w-4 h-4 text-slate-400" />
                        ~{selectedIncident.estimatedPeople} people
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500 mb-2">Description</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      {selectedIncident.description}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">Select a marker to view details</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
