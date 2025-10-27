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
      subject_code: "CS101",
      name: "Programming Fundamentals",
    },
    description: "",
    start_time: "2025-10-27 08:00:00",
    end_time: "2025-10-27 10:00:00",
    class_size: 10,
    status: "confirmed",
  },
  {
    teacher: {
      id: 3,
      first_name: "Grace",
      last_name: "Hopper",
      email: "grace.hopper@gmail.com",
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

export const scheduleLessons = [
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
      subject_code: "CS101",
      name: "Programming Fundamentals",
    },
    description: "",
    start_time: "2025-10-27 08:00:00",
    end_time: "2025-10-27 10:00:00",
    class_size: 10,
    status: "confirmed",
  },
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
    start_time: "2025-10-27 10:00:00",
    end_time: "2025-10-27 12:00:00",
    class_size: 10,
    status: "confirmed",
  },
];

export const leaves = [
  {
    id: 1,
    teacher: {
      id: 2,
      first_name: "Alan",
      last_name: "Turing",
      email: "alan.turing@gmail.com",
    },
    start_date: "2025-10-27",
    end_date: "2025-10-28",
    status: "pending",
  },
  {
    id: 2,
    teacher: {
      id: 3,
      first_name: "Grace",
      last_name: "Hopper",
      email: "grace.hopper@gmail.com",
    },
    start_date: "2025-10-27",
    end_date: "2025-10-28",
    status: "pending",
  },
];

export const scheduleLeaves = [
  {
    id: 1,
    teacher: {
      id: 2,
      first_name: "Alan",
      last_name: "Turing",
      email: "alan.turing@gmail.com",
    },
    start_date: "2025-10-27",
    end_date: "2025-10-28",
    status: "pending",
  },
];
