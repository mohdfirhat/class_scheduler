export const lessons = [
  {
    teacher: {
      id: 2,
      first_name: "Alan",
      last_name: "Turing",
      email: "alan.turing@gmail.com",
    },
    venue: {
      name: "LT-101",
      address: "Address 1",
      description: "Lecture Hall 1",
      occupancy: 10,
    },
    subject: {
      id: "CS101",
      name: "Programming Fundamentals",
    },
    description: "",
    start_time: "2025-10-27 08:00:00",
    end_time: "2025-10-27 10:00:00",
    class_size: 10,
    status: "confirmed",
  },
];

export const leaves = [
  {
    id: 1,
    teacher: {
      first_name: "Alan",
      last_name: "Turing",
      email: "alan.turing@gmail.com",
    },
    start_date: "2025-10-27",
    end_date: "2025-10-28",
    status: "pending",
  },
];
