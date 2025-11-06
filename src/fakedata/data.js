export const lessons = [
  {
    id: 1,
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
    id: 2,
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
      subject_code: "CS101",
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
    id: 1,
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
    id: 2,
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

export const conflictLessonsAndTeachers2 = [
  {
    lesson: {
      id: 1,
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
    availableTeachers: [
      {
        id: 3,
        first_name: "Grace",
        last_name: "Hopper",
        email: "grace.hopper@gmail.com",
      },
    ],
  },
  {
    lesson: {
      id: 2,
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
      start_time: "2025-10-27 10:00:00",
      end_time: "2025-10-27 12:00:00",
      class_size: 10,
      status: "confirmed",
    },
    availableTeachers: [
      {
        id: 3,
        first_name: "Grace",
        last_name: "Hopper",
        email: "grace.hopper@gmail.com",
      },
      {
        id: 4,
        first_name: "Linus",
        last_name: "Torvalds",
        email: "linus.torvalds@gmail.com",
      },
    ],
  },
];

//get lessons and leaves of all subteachers+ leaveteacher id 2,3,4
export const conflictAllLessons = [
  {
    id: 1,
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
    id: 2,
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
    start_time: "2025-10-27 10:00:00",
    end_time: "2025-10-27 12:00:00",
    class_size: 10,
    status: "confirmed",
  },
  {
    id: 3,
    teacher: {
      id: 4,
      first_name: "Linus",
      last_name: "Torvalds",
      email: "linus.torvalds@gmail.com",
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
    id: 4,
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
      subject_code: "CS101",
      name: "Programming Fundamentals",
    },
    description: "",
    start_time: "2025-10-29 08:00:00",
    end_time: "2025-10-29 10:00:00",
    class_size: 10,
    status: "confirmed",
  },
];

export const conflictIdOne = {
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
};

export const conflictAllLeaves = [
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
      id: 4,
      first_name: "Linus",
      last_name: "Torvalds",
      email: "linus.torvalds@gmail.com",
    },
    start_date: "2025-10-30",
    end_date: "2025-10-31",
    status: "pending",
  },
];

export const timeslots = [
  {
    id: 1,
    startTime: "08:00.00",
    endTime: "10:00:00",
  },
  {
    id: 2,
    startTime: "10:00.00",
    endTime: "12:00:00",
  },
  {
    id: 3,
    startTime: "13:00.00",
    endTime: "15:00:00",
  },
  {
    id: 4,
    startTime: "15:00.00",
    endTime: "17:00:00",
  },
];

export const courses = [
  {
    courseCode: "CS101",
    name: "Programming Fundamentals",
  },
  {
    courseCode: "CS102",
    name: "Object-Oriented Programming",
  },
  {
    courseCode: "CS103",
    name: "Data Structures and Algorithms",
  },
  {
    courseCode: "CS201",
    name: "Database Systems",
  },
  {
    courseCode: "CS202",
    name: "Web Development",
  },
  {
    courseCode: "CS203",
    name: "Software Engineering",
  },
];
