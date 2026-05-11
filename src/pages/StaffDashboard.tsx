import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const mockStudents = [
  { id: '1', name: 'John Doe', studentId: 'MCC-2024-001', mark: '' },
  { id: '2', name: 'Jane Smith', studentId: 'MCC-2024-002', mark: '' },
  { id: '3', name: 'Michael Johnson', studentId: 'MCC-2024-003', mark: '' },
  { id: '4', name: 'Sarah Williams', studentId: 'MCC-2024-004', mark: '' },
  { id: '5', name: 'David Brown', studentId: 'MCC-2024-005', mark: '' },
];

const classes = ['Form 4A', 'Form 4B', 'Lower 6 Arts', 'Lower 6 Sciences', 'Upper 6 Commercials'];

export const StaffDashboard: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [students, setStudents] = useState(mockStudents);
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const handleMarkChange = (id: string, value: string) => {
    // Basic sanitization: only allow numeric digits
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    // Strict bounds checking before setting state
    if (sanitizedValue !== '') {
      const numValue = parseInt(sanitizedValue, 10);
      if (numValue < 0 || numValue > 100) return;
    }

    setStudents(students.map(student =>
      student.id === id ? { ...student, mark: sanitizedValue } : student
    ));
  };

  const convertMarkToGrade = (mark: number): string => {
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B';
    if (mark >= 60) return 'C';
    if (mark >= 50) return 'D';
    return 'U';
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Validate all marks before proceeding with any network requests
      const invalidStudents = students.filter(s => {
        if (s.mark === '') return false;
        const mark = parseInt(s.mark, 10);
        return isNaN(mark) || mark < 0 || mark > 100;
      });

      if (invalidStudents.length > 0) {
        alert("Validation Error: Please ensure all entered marks are numbers between 0 and 100.");
        setIsSaving(false);
        return;
      }

      const submissions = students
        .filter(student => student.mark !== '')
        .map(async (student) => {
          // Double sanitize the payload data just in case
          const cleanMark = parseInt(student.mark, 10);

          const payload = {
            student_id: String(student.studentId).trim(),
            subject: 'Mathematics',
            level: String(selectedClass).includes('Form 4') ? 'O-Level' : 'A-Level',
            grade: convertMarkToGrade(cleanMark),
          };

          const API_URL = import.meta.env.VITE_API_URL;

          // Securely attach the token directly in the payload to bypass CORS preflight issues
          const securePayload = {
            ...payload,
            auth_token: user?.token
          };

          return fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(securePayload),
          });
        });

      await Promise.all(submissions);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Clear marks after saving
      setStudents(students.map(s => ({ ...s, mark: '' })));
    } catch (error) {
      console.error("Failed to save grades:", error);
      alert("Failed to save grades. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-opacity animate-fade-in z-50">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="font-medium">Grades saved successfully!</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Entry</h1>
          <p className="text-sm text-gray-500">Enter mid-term exam marks for your students.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center px-4 py-2 text-white rounded-lg transition-colors shadow-sm ${
            isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-navy hover:bg-navyDark'
          }`}
        >
          <Save className={`h-4 w-4 mr-2 ${isSaving ? 'animate-pulse' : ''}`} />
          {isSaving ? 'Saving...' : 'Save Grades'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6 w-64">
          <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-navy focus:border-navy sm:text-sm rounded-lg border"
          >
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Mark (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student.mark}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                      className="block w-24 pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-navy focus:border-navy sm:text-sm"
                      placeholder="0-100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
