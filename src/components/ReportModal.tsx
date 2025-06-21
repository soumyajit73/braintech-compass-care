import React from 'react';
import { X, FileText, Brain, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report) return null;

  const getDiagnosisColor = (diagnosis: string) => {
    if (diagnosis.includes('Non Demented')) return 'text-green-600';
    if (diagnosis.includes('Very Mild')) return 'text-yellow-600';
    if (diagnosis.includes('Mild')) return 'text-orange-600';
    if (diagnosis.includes('Moderate')) return 'text-red-600';
    return 'text-gray-600';
  };

  // Split insights into sections for better display
  const formatInsights = (insights: string) => {
    const sections = insights.split('\n\n').filter(s => s.trim());
    return sections;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-primary-600" />
            MRI Analysis Report
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="p-6 space-y-6">
            {/* Report Header */}
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4">
              <p className="text-sm text-gray-600">Scan: {report.fileName}</p>
              <p className="text-sm text-gray-600">Date: {new Date(report.uploadDate).toLocaleDateString()}</p>
            </Card>

            {/* MRI Validation */}
            {!report.isMRI && (
              <Card className="bg-red-50 border-red-200 p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  <p className="text-red-800 font-semibold">
                    This image does not appear to be a valid Brain MRI scan
                  </p>
                </div>
              </Card>
            )}

            {/* Primary Diagnosis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Primary Diagnosis</h3>
              <div className="text-center">
                <p className={`text-3xl font-bold mb-2 ${getDiagnosisColor(report.diagnosis)}`}>
                  {report.diagnosis}
                </p>
                <p className="text-lg text-gray-600">
                  Confidence: <span className="font-semibold">{report.confidence}%</span>
                </p>
              </div>
            </Card>

            {/* Confidence Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
              <div className="space-y-3">
                {report.allConfidences.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.condition}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-primary-600' : 'bg-gray-400'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {item.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detailed Medical Insights</h3>
              <div className="prose max-w-none text-gray-700">
                {formatInsights(report.insights).map((section, index) => (
                  <div key={index} className="mb-4">
                    <p className="whitespace-pre-wrap">{section}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                className="flex-1 bg-primary-600 hover:bg-primary-700"
                onClick={() => {
                  // Implement download functionality
                  window.print();
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;