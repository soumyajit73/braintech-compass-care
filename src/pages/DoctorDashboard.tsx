import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Calendar, User, Search, Plus, X, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAppointments, updateAppointmentStatus } from '@/api/appointment';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [doctorInfo, setDoctorInfo] = useState({ name: '', specialty: '' });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    completed: 0
  });
  const navigate = useNavigate();

  const [timeSlots] = useState([
    { day: 'Monday', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] },
    { day: 'Tuesday', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'] },
    { day: 'Wednesday', slots: ['10:00 AM', '2:30 PM', '4:00 PM'] },
    { day: 'Thursday', slots: ['9:30 AM', '11:30 AM', '2:00 PM'] },
    { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] }
  ]);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getDoctorAppointments();
      if (response.success) {
        setAppointments(response.appointments);
        
        // Calculate stats
        const newStats = response.appointments.reduce((acc: any, apt: any) => {
          acc.total++;
          if (apt.status === 'pending') acc.pending++;
          if (apt.status === 'accepted') acc.accepted++;
          if (apt.status === 'completed') acc.completed++;
          return acc;
        }, { total: 0, pending: 0, accepted: 0, completed: 0 });
        
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get doctor info from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setDoctorInfo({
        name: user.fullName,
        specialty: 'Specialist'
      });
    }
    fetchAppointments();
  }, []);

  const handleAppointmentAction = async (id: string, action: 'accept' | 'reject') => {
    try {
      setUpdatingId(id);
      const status = action === 'accept' ? 'accepted' : 'cancelled';
      const response = await updateAppointmentStatus(id, status);
      
      if (response.success) {
        // Update local state
        setAppointments(prev => 
          prev.map(apt => 
            apt._id === id ? { ...apt, status } : apt
          )
        );
        
        // Update stats
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleViewProfile = (patientId: string) => {
    // Navigate to patient dashboard
    // You might want to pass patientId as a query param or state
    navigate('/patient-dashboard', { state: { viewingPatientId: patientId } });
  };

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

  // Get today's appointments
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointmentDate).toDateString();
    const today = new Date().toDateString();
    return aptDate === today;
  });

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
                    {stats.pending} Pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading appointments...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment._id} className="p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                             {(appointment.patientName || 'P').split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
                              <p className="text-sm text-gray-600">
                                {appointment.reason || 'General Consultation'}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(appointment.appointmentDate)} at {appointment.timeSlot}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            {appointment.status === 'accepted' && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {appointment.status === 'cancelled' && (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          {appointment.status === 'pending' ? (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleAppointmentAction(appointment._id, 'accept')}
                                disabled={updatingId === appointment._id}
                              >
                                {updatingId === appointment._id ? 'Updating...' : 'Accept'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => handleAppointmentAction(appointment._id, 'reject')}
                                disabled={updatingId === appointment._id}
                              >
                                {updatingId === appointment._id ? 'Updating...' : 'Decline'}
                              </Button>
                            </>
                          ) : (
                            <div className="flex items-center space-x-2 text-sm">
                              {appointment.status === 'accepted' && (
                                <span className="text-green-600 font-medium">✓ Accepted</span>
                              )}
                              {appointment.status === 'cancelled' && (
                                <span className="text-red-600 font-medium">✗ Declined</span>
                              )}
                            </div>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewProfile(appointment.patientId)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">No appointments yet</p>
                    <p className="text-sm text-gray-400">Patients will be able to book appointments with you</p>
                  </div>
                )}
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
                  {appointments.filter(apt => apt.status === 'accepted' || apt.status === 'completed').map((appointment) => (
                    <div key={appointment._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600">
                            Appointment: {formatDate(appointment.appointmentDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800">
                            {appointment.status}
                          </Badge>
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
                  {appointments.filter(apt => apt.status === 'accepted' || apt.status === 'completed').length === 0 && (
                    <p className="text-center text-gray-500 py-4">No patient reports available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Keep the rest of your sidebar code as is */}
          <div className="space-y-6">
            {/* Your existing sidebar components remain the same */}
            {/* Time Slots Management, Profile Settings, Today's Summary, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;