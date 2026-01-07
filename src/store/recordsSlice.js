import { createSlice } from "@reduxjs/toolkit";

const demoRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "123-456-7854",
    position: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    phone: "234-567-8901",
    position: "Designer",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@gmail.com",
    phone: "345-678-9012",
    position: "Project Manager",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@gmail.com",
    phone: "456-789-0123",
    position: "QA Engineer",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@gmail.com",
    phone: "567-890-1234",
    position: "DevOps Engineer",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    email: "sophia.martinez@gmail.com",
    phone: "678-901-2345",
    position: "Business Analyst",
  },
  {
    id: 7,
    name: "Daniel Anderson",
    email: "daniel.anderson@gmail.com",
    phone: "789-012-3456",
    position: "Product Owner",
  },
  {
    id: 8,
    name: "Olivia Taylor",
    email: "olivia.taylor@gmail.com",
    phone: "890-123-4567",
    position: "HR Manager",
  },
  {
    id: 9,
    name: "James Thomas",
    email: "james.thomas@gmail.com",
    phone: "901-234-5678",
    position: "UI/UX Designer",
  },
  {
    id: 10,
    name: "Isabella Moore",
    email: "isabella.moore@gmail.com",
    phone: "012-345-6789",
    position: "Marketing Specialist",
  },
];

const loadRecordsFromStorage = () => {
  try {
    const savedRecords = localStorage.getItem("employeeRecords");
    return savedRecords ? JSON.parse(savedRecords) : [];
  } catch (error) {
    console.error(error);
  }
};
const calculateNextId = (records) => {
  if (!records || records.length === 0) return 1;
  return Math.max(...records.map((r) => r.id)) + 1;
};

const recordsSlice = createSlice({
  name: "records",
  initialState: {
    items: loadRecordsFromStorage(),
    searchTerm: "",
    nextId: calculateNextId(loadRecordsFromStorage()),
  },
  reducers: {
    // Add the new record reduce functions
    addRecord: (state, action) => {
      const newRecord = { id: state.nextId, ...action.payload };
      state.items.push(newRecord);

      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // update the exist record
    updateRecord: (state, action) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex((r) => r.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
        localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      }
    },

    // delete record
    deleteRecord: (state, action) => {
      console.log(state.items, action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },

    // search items
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    resetAllRecords: (state) => {
      state.items = demoRecords;
      state.nextId = calculateNextId(demoRecords);
      localStorage.setItem("employeeRecords", JSON.stringify(demoRecords));
    },
  },
});

export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setSearchTerm,
  resetAllRecords,
} = recordsSlice.actions;

export const selectAllRecords = (state) => state.records.items;
export const selectSearchTerm = (state) => state.records.searchTerm;

export const selectFilteredRecords = (state) => {
  const term = state.records.searchTerm.toLowerCase();
  return state.records.items.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.position.toLowerCase().includes(term)
  );
};
export default recordsSlice.reducer;
