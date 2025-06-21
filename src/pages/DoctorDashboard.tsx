
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Calendar, User, Search, Plus, X } from 'lucide-react';

const DoctorDashboard = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([
    { id: 1, patient: 'John D.', age: 45, condition: 'Brain Scan Review', date: '2024-01-15', time: '10:00 AM', status: 'Pending' },
    { id: 2, patient: 'Sarah M.', age: 62, condition: 'Follow-up Consultation', date: '2024-01-16', time: '2:30 PM', status: 'Pending' },
    { id: 3, patient: 'Michael R.', age: 38, condition: 'Initial Assessment', date: '2024-01-17', time: '9:00 AM', status: 'Pending' }
  ]);

  const [timeSlots] = useState([
    { day: 'Monday', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] },
    { day: 'Tuesday', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'] },
    { day: 'Wednesday', slots: ['10:00 AM', '2:30 PM', '4:00 PM'] },
    { day: 'Thursday', slots: ['9:30 AM', '11:30 AM', '2:00 PM'] },
    { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] }
  ]);

  const handleAppointmentAction = (id: number, action: 'accept' | 'reject') => {
    setAppointmentRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status: action === 'accept' ? 'Accepted' : 'Rejected' }
          : req
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and review patient cases.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointment Requests */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                    Appointment Requests
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {appointmentRequests.filter(req => req.status === 'Pending').length} Pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentRequests.map((request) => (
                    <div key={request.id} className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                            {request.patient.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.patient}</h4>
                            <p className="text-sm text-gray-600">Age: {request.age} • {request.condition}</p>
                            <p className="text-sm text-gray-600">{request.date} at {request.time}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      {request.status === 'Pending' && (
                        <div className="flex space-x-3">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleAppointmentAction(request.id, 'accept')}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleAppointmentAction(request.id, 'reject')}
                          >
                            Decline
                          </Button>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Reports Viewer */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Search className="w-5 h-5 mr-2 text-secondary-600" />
                  Patient Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { patient: 'John D.', reportDate: '2024-01-12', scanType: 'Brain MRI', aiConfidence: '94%', priority: 'High' },
                    { patient: 'Sarah M.', reportDate: '2024-01-10', scanType: 'CT Scan', aiConfidence: '87%', priority: 'Medium' },
                    { patient: 'Michael R.', reportDate: '2024-01-08', scanType: 'Brain MRI', aiConfidence: '91%', priority: 'Low' }
                  ].map((report, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{report.patient}</h4>
                          <p className="text-sm text-gray-600">{report.scanType} • {report.reportDate}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            report.priority === 'High' ? 'bg-red-100 text-red-800' :
                            report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {report.priority} Priority
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">AI: {report.aiConfidence}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button size="sm" className="bg-primary-500 hover:bg-primary-600">
                          View Report
                        </Button>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          Add Notes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Time Slots Management */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                  Available Time Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSlots.map((day, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{day.day}</h4>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot, slotIndex) => (
                          <Badge key={slotIndex} variant="outline" className="text-xs">
                            {slot}
                            <X className="w-3 h-3 ml-1 cursor-pointer hover:text-red-500" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-primary-500 hover:bg-primary-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time Slot
                </Button>
              </CardContent>
            </Card>

            {/* Profile Settings */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="w-5 h-5 mr-2 text-secondary-600" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                      DW
                    </div>
                    <h3 className="font-semibold text-gray-900">Dr. Wilson</h3>
                    <p className="text-sm text-gray-600">Neurology Specialist</p>
                    <p className="text-sm text-gray-600">License: MD123456</p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-sm">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full text-sm">
                      Update Credentials
                    </Button>
                    <Button variant="outline" className="w-full text-sm">
                      Notification Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Appointments</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Reviews</span>
                    <span className="font-semibold text-yellow-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reports Reviewed</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Appointment</span>
                    <span className="font-semibold text-primary-600">2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="medical-shadow border-0">
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">New appointment request</p>
                    <p className="text-xs text-blue-700">5 minutes ago</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Report analysis completed</p>
                    <p className="text-xs text-green-700">1 hour ago</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-900">Schedule change requested</p>
                    <p className="text-xs text-yellow-700">2 hours ago</p>
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

export default DoctorDashboard;
