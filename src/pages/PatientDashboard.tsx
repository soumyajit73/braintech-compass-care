import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Calendar, Upload, Plus } from 'lucide-react';
import AppointmentModal from '@/components/AppointmentModal';
import { getMyAppointments } from '@/api/appointment';
import axios from 'axios';
import jsPDF from 'jspdf';

const PatientDashboard = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [viewReport, setViewReport] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getMyAppointments();
      if (response.success) {
        setAppointments(response.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const downloadPdfReport = () => {
    if (!aiResult?.dementiaAnalysis) return;

    const doc = new jsPDF();

    const title = '🧠 Brain MRI Analysis Report';
    const predicted = `Predicted Class: ${aiResult.dementiaAnalysis.predictedClass}`;
    const confidence = `Confidence: ${(aiResult.dementiaAnalysis.confidences[aiResult.dementiaAnalysis.predictedClass] * 100).toFixed(2)}%`;
    const insights = aiResult.dementiaAnalysis.insights;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(title, 10, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(predicted, 10, 35);
    doc.text(confidence, 10, 45);

    doc.setFontSize(11);
    const lines = doc.splitTextToSize(insights, 180);
    doc.text(lines, 10, 60);

    doc.save('brain_mri_report.pdf');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'https://arittrabag-mri-h4b.hf.space/detect',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setAiResult(response.data);
      alert('Prediction successful!');
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Failed to predict. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your health overview.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* MRI Upload Section */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Upload className="w-5 h-5 mr-2 text-primary-600" />
                  MRI Scan Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-primary-200 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload New MRI Scan</h3>
                  <p className="text-gray-600 mb-4">Select your brain scan image and run prediction</p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="mb-4"
                  />

                  <div className="space-x-4">
                    <Button
                      disabled={!selectedFile || uploading}
                      onClick={handleUpload}
                      className="bg-primary-500 hover:bg-primary-600"
                    >
                      {uploading ? 'Uploading...' : 'Upload & Predict'}
                    </Button>

                    {aiResult && (
                      <Button
                        onClick={() => {
                          setViewReport(true);
                          downloadPdfReport(); // <-- Automatically download on view
                        }}
                        className="bg-secondary-500 hover:bg-secondary-600"
                      >
                        View Report
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Report Viewer */}
            {viewReport && aiResult && (
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>AI Analysis Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiResult.dementiaAnalysis ? (
                    <>
                      <p><strong>Predicted Class:</strong> {aiResult.dementiaAnalysis.predictedClass}</p>
                      <p><strong>Confidence:</strong> {(
                        aiResult.dementiaAnalysis.confidences[aiResult.dementiaAnalysis.predictedClass] * 100
                      ).toFixed(2)}%</p>
                      <p className="whitespace-pre-line text-sm text-gray-700">
                        {aiResult.dementiaAnalysis.insights}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-600 font-medium">Prediction structure is invalid. Please try another scan or contact support.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointments */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Loading appointments...</p>
                    </div>
                  ) : appointments.length > 0 ? (
                    appointments.slice(0, 3).map((appointment) => (
                      <div key={appointment._id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{appointment.doctorName}</h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{appointment.specialty || 'General'}</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(appointment.appointmentDate)} at {appointment.timeSlot}
                        </p>
                        {appointment.reason && (
                          <p className="text-xs text-gray-500 mt-1">Reason: {appointment.reason}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-2">No appointments scheduled</p>
                      <p className="text-sm text-gray-400">Click below to book your first appointment</p>
                    </div>
                  )}
                </div>
                <Button
                  className="w-full mt-4 bg-primary-500 hover:bg-primary-600"
                  onClick={() => setShowAppointmentModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        onSuccess={() => {
          fetchAppointments();
          setShowAppointmentModal(false);
          alert('Appointment booked successfully!');
        }}
      />
    </div>
  );
};

export default PatientDashboard;
