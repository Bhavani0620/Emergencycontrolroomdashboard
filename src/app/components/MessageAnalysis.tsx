import { mockMessages, Message } from '../data/mockData';
import { Smartphone, MessageCircle, Share2, MapPin, Users, AlertCircle, Clock, Brain } from 'lucide-react';
import { ConfidenceBadge } from './StatusBadge';

export function MessageAnalysis() {
  const getSourceIcon = (source: Message['source']) => {
    switch (source) {
      case 'SMS':
        return Smartphone;
      case 'WhatsApp':
        return MessageCircle;
      case 'Social Media':
        return Share2;
    }
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 90) return 'text-red-600 bg-red-50';
    if (score >= 75) return 'text-orange-600 bg-orange-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <div className="font-medium text-blue-900 mb-1">AI-Assisted Message Analysis</div>
          <div className="text-sm text-blue-700">
            All messages are automatically analyzed by AI. Human review and verification is required before taking action.
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {mockMessages.map((message) => {
          const SourceIcon = getSourceIcon(message.source);
          
          return (
            <div
              key={message.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 divide-x divide-slate-200">
                {/* Left Panel: Raw Message */}
                <div className="p-5 bg-slate-50">
                  <div className="flex items-center gap-2 mb-3">
                    <SourceIcon className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-medium text-slate-600 uppercase">{message.source}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
                  </div>
                  
                  <div className="mb-2 text-xs text-slate-500 uppercase font-medium">Raw Message</div>
                  <div className="bg-white border border-slate-200 rounded p-3 text-sm text-slate-700 leading-relaxed font-mono">
                    {message.rawText}
                  </div>

                  {message.aiAnalysis.messageDelay && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                      <Clock className="w-4 h-4" />
                      <span>{message.aiAnalysis.messageDelay}</span>
                    </div>
                  )}
                </div>

                {/* Right Panel: AI Analysis */}
                <div className="p-5">
                  <div className="mb-4 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600 uppercase">
                        AI Suggested Analysis (Human Review Required)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Need Type</div>
                      <div className="text-sm font-medium text-slate-900">{message.aiAnalysis.needType}</div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-1">Estimated People Affected</div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-900">
                          ~{message.aiAnalysis.estimatedPeople} people
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-1">Location</div>
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                        <span className="text-sm text-slate-900">{message.aiAnalysis.location}</span>
                      </div>
                      <ConfidenceBadge level={message.aiAnalysis.locationConfidence} />
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-2">Urgency Assessment</div>
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${getUrgencyColor(message.aiAnalysis.urgencyScore)}`}>
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-semibold">{message.aiAnalysis.urgencyScore}/100</span>
                      </div>
                      <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                        {message.aiAnalysis.urgencyExplanation}
                      </div>
                    </div>

                    {message.incidentId && (
                      <div className="pt-3 border-t border-slate-200">
                        <div className="text-xs text-slate-500 mb-1">Linked to Incident</div>
                        <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-mono">
                          {message.incidentId}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
