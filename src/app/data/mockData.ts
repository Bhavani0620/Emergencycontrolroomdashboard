export type IncidentType = 'Flood' | 'Medical' | 'Rescue' | 'Fire';
export type UrgencyLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'New' | 'In Review' | 'Assigned' | 'Resolved';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface Incident {
  id: string;
  type: IncidentType;
  location: string;
  coordinates: { lat: number; lng: number };
  locationConfidence: ConfidenceLevel;
  urgency: UrgencyLevel;
  reportCount: number;
  status: IncidentStatus;
  timestamp: string;
  description: string;
  estimatedPeople?: number;
}

export interface Message {
  id: string;
  rawText: string;
  source: 'SMS' | 'WhatsApp' | 'Social Media';
  timestamp: string;
  aiAnalysis: {
    needType: string;
    estimatedPeople: number;
    location: string;
    locationConfidence: ConfidenceLevel;
    urgencyScore: number;
    urgencyExplanation: string;
    messageDelay?: string;
  };
  incidentId?: string;
}

export interface Resource {
  id: string;
  type: 'NGO' | 'Ambulance' | 'Rescue Team' | 'Relief Camp';
  name: string;
  status: 'Available' | 'Assigned' | 'En Route' | 'Unavailable';
  location: string;
  capacity?: number;
}

export const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    type: 'Flood',
    location: 'District 12, Sector 4B',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    locationConfidence: 'High',
    urgency: 'Critical',
    reportCount: 47,
    status: 'New',
    timestamp: '2026-02-07T14:23:00',
    description: 'Severe flooding in residential area, multiple families stranded on rooftops',
    estimatedPeople: 150,
  },
  {
    id: 'INC-002',
    type: 'Medical',
    location: 'Central Park Area, Block A',
    coordinates: { lat: 28.5355, lng: 77.3910 },
    locationConfidence: 'High',
    urgency: 'Critical',
    reportCount: 12,
    status: 'In Review',
    timestamp: '2026-02-07T14:45:00',
    description: 'Mass casualty event, multiple injuries reported',
    estimatedPeople: 25,
  },
  {
    id: 'INC-003',
    type: 'Rescue',
    location: 'Highway 23, Near Milestone 45',
    coordinates: { lat: 28.4089, lng: 77.3178 },
    locationConfidence: 'Medium',
    urgency: 'High',
    reportCount: 8,
    status: 'Assigned',
    timestamp: '2026-02-07T13:15:00',
    description: 'Vehicle accident with people trapped',
    estimatedPeople: 6,
  },
  {
    id: 'INC-004',
    type: 'Fire',
    location: 'Industrial Zone 7, Warehouse Complex',
    coordinates: { lat: 28.7041, lng: 77.1025 },
    locationConfidence: 'High',
    urgency: 'High',
    reportCount: 23,
    status: 'In Review',
    timestamp: '2026-02-07T14:56:00',
    description: 'Large fire in industrial warehouse, smoke visible from distance',
    estimatedPeople: 15,
  },
  {
    id: 'INC-005',
    type: 'Medical',
    location: 'Downtown Market Street',
    coordinates: { lat: 28.6328, lng: 77.2197 },
    locationConfidence: 'Medium',
    urgency: 'Medium',
    reportCount: 5,
    status: 'New',
    timestamp: '2026-02-07T15:10:00',
    description: 'Person collapsed, needs medical attention',
    estimatedPeople: 1,
  },
  {
    id: 'INC-006',
    type: 'Flood',
    location: 'Riverside Colony',
    coordinates: { lat: 28.5494, lng: 77.2501 },
    locationConfidence: 'Low',
    urgency: 'Medium',
    reportCount: 3,
    status: 'New',
    timestamp: '2026-02-07T15:22:00',
    description: 'Water logging in low-lying areas',
    estimatedPeople: 30,
  },
  {
    id: 'INC-007',
    type: 'Rescue',
    location: 'Old Town Bridge Area',
    coordinates: { lat: 28.6692, lng: 77.4538 },
    locationConfidence: 'High',
    urgency: 'Low',
    reportCount: 2,
    status: 'Resolved',
    timestamp: '2026-02-07T12:30:00',
    description: 'People stuck in elevator - resolved',
    estimatedPeople: 4,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'MSG-001',
    rawText: 'Urgent! Water level rising fast in our neighborhood. 15-20 families on rooftops. District 12 sector 4B. Need boats immediately!!!',
    source: 'WhatsApp',
    timestamp: '2026-02-07T14:23:00',
    aiAnalysis: {
      needType: 'Flood Rescue / Evacuation',
      estimatedPeople: 60,
      location: 'District 12, Sector 4B',
      locationConfidence: 'High',
      urgencyScore: 95,
      urgencyExplanation: 'Immediate danger to life, rising water levels, multiple families at risk',
    },
    incidentId: 'INC-001',
  },
  {
    id: 'MSG-002',
    rawText: 'SOS multiple ppl injured near central park need ambulance fast blood everywhere',
    source: 'SMS',
    timestamp: '2026-02-07T14:45:00',
    aiAnalysis: {
      needType: 'Medical Emergency / Mass Casualty',
      estimatedPeople: 10,
      location: 'Central Park Area',
      locationConfidence: 'High',
      urgencyScore: 98,
      urgencyExplanation: 'Life-threatening injuries, multiple casualties, immediate medical intervention required',
    },
    incidentId: 'INC-002',
  },
  {
    id: 'MSG-003',
    rawText: 'Big fire at warehouse in industrial zone 7. Lots of smoke. Some workers still inside I think.',
    source: 'Social Media',
    timestamp: '2026-02-07T14:56:00',
    aiAnalysis: {
      needType: 'Fire Rescue / Evacuation',
      estimatedPeople: 15,
      location: 'Industrial Zone 7, Warehouse Complex',
      locationConfidence: 'High',
      urgencyScore: 90,
      urgencyExplanation: 'Active fire with potential trapped victims, requires immediate fire and rescue response',
    },
    incidentId: 'INC-004',
  },
  {
    id: 'MSG-004',
    rawText: 'Car crash on highway 23 around milestone 45. People trapped inside. Send help.',
    source: 'SMS',
    timestamp: '2026-02-07T13:15:00',
    aiAnalysis: {
      needType: 'Vehicle Rescue / Medical',
      estimatedPeople: 6,
      location: 'Highway 23, Near Milestone 45',
      locationConfidence: 'Medium',
      urgencyScore: 85,
      urgencyExplanation: 'Trapped victims requiring extrication, potential injuries',
      messageDelay: 'Reported 2 hours ago',
    },
    incidentId: 'INC-003',
  },
  {
    id: 'MSG-005',
    rawText: 'Someone just collapsed on market street downtown. Not moving. Please send ambulance.',
    source: 'WhatsApp',
    timestamp: '2026-02-07T15:10:00',
    aiAnalysis: {
      needType: 'Medical Emergency',
      estimatedPeople: 1,
      location: 'Downtown Market Street',
      locationConfidence: 'Medium',
      urgencyScore: 75,
      urgencyExplanation: 'Single person medical emergency, consciousness status unknown',
    },
    incidentId: 'INC-005',
  },
];

export const mockResources: Resource[] = [
  {
    id: 'RES-001',
    type: 'Rescue Team',
    name: 'National Disaster Response Team Alpha',
    status: 'Available',
    location: 'Station 4',
    capacity: 12,
  },
  {
    id: 'RES-002',
    type: 'Ambulance',
    name: 'Emergency Medical Unit 7',
    status: 'Available',
    location: 'Central Hospital',
  },
  {
    id: 'RES-003',
    type: 'NGO',
    name: 'Red Cross Relief Unit',
    status: 'Available',
    location: 'District HQ',
    capacity: 50,
  },
  {
    id: 'RES-004',
    type: 'Relief Camp',
    name: 'Community Shelter - East',
    status: 'Available',
    location: 'East District Sports Complex',
    capacity: 500,
  },
  {
    id: 'RES-005',
    type: 'Rescue Team',
    name: 'Fire & Rescue Squad B',
    status: 'En Route',
    location: 'En route to INC-004',
    capacity: 8,
  },
  {
    id: 'RES-006',
    type: 'Ambulance',
    name: 'Emergency Medical Unit 3',
    status: 'Assigned',
    location: 'Assigned to INC-002',
  },
  {
    id: 'RES-007',
    type: 'Rescue Team',
    name: 'Water Rescue Team Delta',
    status: 'Available',
    location: 'River Station 2',
    capacity: 10,
  },
  {
    id: 'RES-008',
    type: 'NGO',
    name: 'Community Aid Foundation',
    status: 'Available',
    location: 'West District',
    capacity: 30,
  },
  {
    id: 'RES-009',
    type: 'Ambulance',
    name: 'Emergency Medical Unit 12',
    status: 'Available',
    location: 'South Medical Center',
  },
  {
    id: 'RES-010',
    type: 'Relief Camp',
    name: 'Temporary Shelter - North',
    status: 'Available',
    location: 'North District School',
    capacity: 300,
  },
];

export const dashboardStats = {
  totalActiveIncidents: 6,
  criticalAlerts: 2,
  messagesProcessed: 1247,
  pendingVerifications: 8,
};
