import { mockResources, mockIncidents, Incident, Resource } from '../data/mockData';
import { Users, Ambulance, LifeBuoy, Home, CheckCircle, XCircle, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { UrgencyBadge, StatusBadge } from './StatusBadge';

interface ResourceAssignmentProps {
  selectedIncident?: Incident;
}

export function ResourceAssignment({ selectedIncident: initialIncident }: ResourceAssignmentProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(initialIncident || null);

  const resourceIcons = {
    NGO: Users,
    Ambulance: Ambulance,
    'Rescue Team': LifeBuoy,
    'Relief Camp': Home,
  };

  const statusColors = {
    Available: 'bg-green-50 text-green-700 border-green-200',
    Assigned: 'bg-blue-50 text-blue-700 border-blue-200',
    'En Route': 'bg-purple-50 text-purple-700 border-purple-200',
    Unavailable: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Incident Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
              <h3 className="font-medium text-slate-900">Select Incident</h3>
            </div>
            <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
              {mockIncidents
                .filter((inc) => inc.status !== 'Resolved')
                .map((incident) => (
                  <button
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                      selectedIncident?.id === incident.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-mono text-sm font-medium text-slate-900">{incident.id}</div>
                      <UrgencyBadge level={incident.urgency} />
                    </div>
                    <div className="text-sm text-slate-700 mb-2">{incident.type} Emergency</div>
                    <div className="text-xs text-slate-600">{incident.location}</div>
                    <div className="mt-2">
                      <StatusBadge status={incident.status} />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Resource Assignment Panel */}
        <div className="lg:col-span-2">
          {selectedIncident ? (
            <div className="space-y-4">
              {/* Selected Incident Details */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Selected Incident</div>
                    <div className="text-xl font-semibold text-slate-900">{selectedIncident.id}</div>
                    <div className="text-slate-700 mt-1">{selectedIncident.type} Emergency</div>
                  </div>
                  <UrgencyBadge level={selectedIncident.urgency} />
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Location</div>
                    <div className="text-sm text-slate-900">{selectedIncident.location}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">People Affected</div>
                    <div className="text-sm text-slate-900">~{selectedIncident.estimatedPeople || 'Unknown'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Reports</div>
                    <div className="text-sm text-slate-900">{selectedIncident.reportCount} messages</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Status</div>
                    <StatusBadge status={selectedIncident.status} />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500 mb-2">Description</div>
                  <div className="text-sm text-slate-700 leading-relaxed">{selectedIncident.description}</div>
                </div>
              </div>

              {/* Available Resources */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                  <h3 className="font-medium text-slate-900">Available Resources</h3>
                  <p className="text-sm text-slate-600">Select resources to assign to this incident</p>
                </div>

                <div className="divide-y divide-slate-200">
                  {mockResources.map((resource) => {
                    const Icon = resourceIcons[resource.type];
                    
                    return (
                      <div key={resource.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-slate-100 rounded-lg">
                              <Icon className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900 mb-1">{resource.name}</div>
                              <div className="text-xs text-slate-600">{resource.type}</div>
                              {resource.capacity && (
                                <div className="text-xs text-slate-600 mt-1">
                                  Capacity: {resource.capacity} {resource.type === 'Relief Camp' ? 'people' : 'personnel'}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-md text-xs border ${statusColors[resource.status]}`}>
                            {resource.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-600">{resource.location}</div>
                          {resource.status === 'Available' && (
                            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                              Assign Resource
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="text-sm font-medium text-slate-900 mb-4">Incident Actions</div>
                <div className="grid md:grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    <span>Request Verification</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                    <XCircle className="w-4 h-4" />
                    <span>Mark as False Alert</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Escalate to Supervisor</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Request More Info</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
              <LifeBuoy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <div className="text-slate-600">Select an incident to assign resources</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
