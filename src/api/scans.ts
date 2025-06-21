const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const uploadScan = async (file: File) => {
  const formData = new FormData();
  formData.append('scan', file);

  const response = await fetch(`${API_URL}/api/scans/upload`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload scan');
  }

  return response.json();
};

export const getMyScans = async () => {
  const response = await fetch(`${API_URL}/api/scans/my-scans`, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch scans');
  }

  return response.json();
};

export const getScanReport = async (scanId: string) => {
  const response = await fetch(`${API_URL}/api/scans/${scanId}/report`, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return response.json();
};