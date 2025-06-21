
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Calendar, Upload, Search, Users, ArrowRight, Plus } from 'lucide-react';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Wilson', specialty: 'Neurology', date: '2024-01-15', time: '10:00 AM', status: 'Pending' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Oncology', date: '2024-01-18', time: '2:30 PM', status: 'Accepted' },
    { id: 3, doctor: 'Dr. Emily Johnson', specialty: 'Neurology', date: '2024-01-12', time: '9:00 AM', status: 'Completed' }
  ]);

  const [mriUploads] = useState([
    { id: 1, filename: 'brain_scan_2024_01_10.dcm', uploadDate: '2024-01-10', status: 'Analyzed', confidence: '94%' },
    { id: 2, filename: 'mri_follow_up_2024_01_05.dcm', uploadDate: '2024-01-05', status: 'Processing', confidence: 'Pending' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                  <p className="text-gray-600 mb-4">Drag and drop your DICOM files or click to browse</p>
                  <Button className="bg-primary-500 hover:bg-primary-600">
                    Select Files
                  </Button>
                </div>

                {/* Upload History */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Uploads</h4>
                  <div className="space-y-3">
                    {mriUploads.map((upload) => (
                      <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{upload.filename}</p>
                          <p className="text-sm text-gray-600">Uploaded: {upload.uploadDate}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={upload.status === 'Analyzed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {upload.status}
                          </Badge>
                          {upload.status === 'Analyzed' && (
                            <Button size="sm" variant="outline">
                              View Report
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Report Viewer */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Search className="w-5 h-5 mr-2 text-secondary-600" />
                  Latest AI Analysis Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Analysis Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confidence Level:</span>
                          <span className="font-semibold text-green-600">94%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Risk Assessment:</span>
                          <span className="font-semibold text-yellow-600">Low-Medium</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Follow-up Needed:</span>
                          <span className="font-semibold text-primary-600">Yes</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Findings</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• No acute abnormalities detected</li>
                        <li>• Minimal age-related changes</li>
                        <li>• Recommend routine follow-up</li>
                        <li>• Consult with neurologist</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="mt-4 bg-secondary-500 hover:bg-secondary-600">
                    Download Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Finder */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Search className="w-5 h-5 mr-2 text-primary-600" />
                  Find Specialists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>All Specialties</option>
                      <option>Neurology</option>
                      <option>Oncology</option>
                      <option>Radiology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Date</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Dr. Sarah Wilson', specialty: 'Neurology', rating: '4.9', nextSlot: 'Tomorrow 10:00 AM' },
                    { name: 'Dr. Michael Chen', specialty: 'Oncology', rating: '4.8', nextSlot: 'Jan 18, 2:30 PM' },
                    { name: 'Dr. Emily Johnson', specialty: 'Neurology', rating: '4.7', nextSlot: 'Jan 20, 9:00 AM' }
                  ].map((doctor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialty} • ⭐ {doctor.rating}</p>
                          <p className="text-sm text-green-600">Next available: {doctor.nextSlot}</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary-500 hover:bg-primary-600">
                        Book Appointment
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointment Tracker */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-primary-500 hover:bg-primary-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Community Access */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-secondary-600" />
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Join Our Community</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with others on similar journeys. Share experiences and find support.
                    </p>
                    <Button 
                      className="bg-secondary-500 hover:bg-secondary-600 w-full"
                      onClick={() => window.location.href = '/community'}
                    >
                      Visit Community
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Scans</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Appointments</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Community Posts</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold">Dec 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
