
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Users, User, Trash, Search, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, title: 'My Journey with Early Detection', author: 'Anonymous User', date: '2024-01-14', category: 'Support', status: 'Published', reports: 0 },
    { id: 2, title: 'Coping Strategies That Help', author: 'Anonymous User', date: '2024-01-13', category: 'Tips', status: 'Under Review', reports: 2 },
    { id: 3, title: 'Questions About Treatment Options', author: 'Anonymous User', date: '2024-01-12', category: 'Questions', status: 'Published', reports: 0 }
  ]);

  const [doctorRegistrations, setDoctorRegistrations] = useState([
    { id: 1, name: 'Dr. Jennifer Adams', specialty: 'Oncology', license: 'MD789012', email: 'j.adams@hospital.com', status: 'Pending', applicationDate: '2024-01-14' },
    { id: 2, name: 'Dr. Robert Chen', specialty: 'Neurology', license: 'MD345678', email: 'r.chen@clinic.com', status: 'Pending', applicationDate: '2024-01-13' }
  ]);

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', role: 'Patient', joinDate: '2024-01-10', status: 'Active' },
    { id: 2, name: 'Dr. Sarah Wilson', email: 'swilson@hospital.com', role: 'Doctor', joinDate: '2024-01-08', status: 'Active' },
    { id: 3, name: 'Michael Smith', email: 'msmith@email.com', role: 'Patient', joinDate: '2024-01-05', status: 'Active' }
  ]);

  const handlePostAction = (id: number, action: 'approve' | 'delete') => {
    if (action === 'approve') {
      setCommunityPosts(prev => 
        prev.map(post => 
          post.id === id ? { ...post, status: 'Published' } : post
        )
      );
    } else {
      setCommunityPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  const handleDoctorAction = (id: number, action: 'approve' | 'reject') => {
    setDoctorRegistrations(prev => 
      prev.map(doc => 
        doc.id === id 
          ? { ...doc, status: action === 'approve' ? 'Approved' : 'Rejected' }
          : doc
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': case 'approved': case 'active': return 'bg-green-100 text-green-800';
      case 'pending': case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform content, users, and system settings.</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          <Card className="medical-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">1,248</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Doctors</p>
                  <p className="text-3xl font-bold text-gray-900">86</p>
                  <p className="text-sm text-green-600">+5 new this week</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Community Posts</p>
                  <p className="text-3xl font-bold text-gray-900">342</p>
                  <p className="text-sm text-yellow-600">8 pending review</p>
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Scans</p>
                  <p className="text-3xl font-bold text-gray-900">5,672</p>
                  <p className="text-sm text-green-600">94% accuracy rate</p>
                </div>
                <div className="w-12 h-12 bg-medical-success/20 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-medical-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Community Post Moderation */}
          <Card className="medical-shadow border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-600" />
                  Community Post Moderation
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {communityPosts.filter(post => post.status === 'Under Review').length} Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{post.title}</h4>
                        <p className="text-sm text-gray-600">By {post.author} • {post.date}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          {post.reports > 0 && (
                            <Badge className="bg-red-100 text-red-800">
                              {post.reports} reports
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Post
                      </Button>
                      {post.status === 'Under Review' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handlePostAction(post.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handlePostAction(post.id, 'delete')}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {post.status === 'Published' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handlePostAction(post.id, 'delete')}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Doctor Registration Approvals */}
          <Card className="medical-shadow border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-secondary-600" />
                  Doctor Registrations
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {doctorRegistrations.filter(doc => doc.status === 'Pending').length} Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorRegistrations.map((doctor) => (
                  <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-sm text-gray-600">License: {doctor.license}</p>
                          <p className="text-sm text-gray-600">{doctor.email}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(doctor.status)}>
                        {doctor.status}
                      </Badge>
                    </div>
                    
                    {doctor.status === 'Pending' && (
                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleDoctorAction(doctor.id, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleDoctorAction(doctor.id, 'reject')}
                        >
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          View Credentials
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <Card className="medical-shadow border-0 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                User Management
              </div>
              <Button className="bg-primary-500 hover:bg-primary-600">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Role</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Join Date</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600">{user.joinDate}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
