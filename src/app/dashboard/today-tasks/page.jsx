"use client"
import React, { useEffect, useState } from 'react';
import { getTasks } from '@/lib/tasks.action';
import { Calendar } from '@/components/ui/calendar';
import TaskList from '@/components/TaskList'; 
import { Toaster } from 'react-hot-toast';
import Modal from '@/components/modal'; 

const TodayTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true); 
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      const response = await getTasks('', 'all', startOfDay, endOfDay);
      if (response.success) {
        setTasks(response.data);
      }
      setIsLoading(false); 
    };

    fetchTasks();
  }, [date]);

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tasks for {date.toDateString()}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
        >
          View Calendar
        </button>
      </div>
      <TaskList tasks={tasks} isLoading={isLoading} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Calendar value={date} onChange={setDate} className="bg-white rounded-md shadow-md p-2" />
      </Modal>
    </div>
  );
};

export default TodayTaskPage;
