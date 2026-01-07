import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addRecord, updateRecord } from "../store/recordsSlice";
import toast from "react-hot-toast";

export default function RecordModel({ closeModel, currentRecord }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  useEffect(() => {
    console.log(currentRecord);
    if (currentRecord) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: currentRecord.name,
        email: currentRecord.email,
        phone: currentRecord.phone,
        position: currentRecord.position,
      });
    } else {
      setFormData({ name: "", email: "", phone: "", position: "" });
    }
  }, [currentRecord]);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Email are requied");
      return;
    }
    if (currentRecord) {
      dispatch(updateRecord({ id: currentRecord.id, data: formData }));
      closeModel();
      toast.success("Record update successfully");
    } else {
      dispatch(addRecord(formData));
      closeModel();
      toast.success("Record added successfully");
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-2xl  max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-grap-800">
            {!currentRecord ? "Register New Record" : "Update Register Record"}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 transition-all"
            onClick={closeModel}
          >
            <X size={24} />
          </button>
        </div>
        {/* Form Fields */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-grap-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded -lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-grap-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email address "
              className="w-full px-4 py-2 border border-gray-300 rounded -lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-grap-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter phone number "
              className="w-full px-4 py-2 border border-gray-300 rounded -lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Position */}
          <div>
            <label className="block text-sm font-semibold text-grap-700 mb-2">
              Position
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              placeholder="Enter Position "
              className="w-full px-4 py-2 border border-gray-300 rounded -lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Footer  buttons */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            className="flex-1 px-4 py-2 border border-gray-300  text-gray-700 rounded-lg hover:bg-gray-50 transition-all fint-medium"
            onClick={closeModel}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-2 border bg-blue-600 text-white border-gray-300  text-gray-700 rounded-lg hover:scale-105 transition-all fint-medium"
            onClick={handleSubmit}
          >
            {currentRecord ? "Update" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
