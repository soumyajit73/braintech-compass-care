const API_URL = 'http://localhost:5000';

// Get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Get all doctors
export const getAllDoctors = async () => {
  try {
    const response = await fetch(`${API_URL}/api/doctors/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Book appointment
export const bookAppointment = async (appointmentData: {
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/api/appointments`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(appointmentData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to book appointment');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

// Get my appointments (works for both patients and doctors)
export const getMyAppointments = async () => {
  try {
    const response = await fetch(`${API_URL}/api/appointments/my-appointments`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get doctor's appointments (specific endpoint for doctors)
export const getDoctorAppointments = async () => {
  try {
    const response = await fetch(`${API_URL}/api/doctors/my-appointments`, {
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch doctor appointments');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    throw error;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (appointmentId: string, status: 'accepted' | 'cancelled') => {
  try {
    const response = await fetch(`${API_URL}/api/doctors/appointment/${appointmentId}/status`, {
      method: 'PATCH',
      headers: getAuthHeader(),
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update appointment status');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

// Cancel appointment (for patients)
export const cancelAppointment = async (appointmentId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/appointments/${appointmentId}/cancel`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to cancel appointment');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};