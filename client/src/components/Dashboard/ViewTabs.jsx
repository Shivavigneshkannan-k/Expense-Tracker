import { useState } from "react";
import { Calendar, ListFilter } from "lucide-react";

const ViewTabs = ({ activeView, setActiveView }) => {
  return (
    <div className='flex bg-white rounded-lg shadow-md border border-gray-100 p-1 mb-6 w-fit'>
      <button
        onClick={() => setActiveView("list")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          activeView === "list"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`}>
        <ListFilter className='w-4 h-4' />
        <span>List View</span>
      </button>

      <button
        onClick={() => setActiveView("month")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          activeView === "month"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`}>
        <Calendar className='w-4 h-4' />
        <span>Monthly View</span>
      </button>
    </div>
  );
};

export default ViewTabs;
