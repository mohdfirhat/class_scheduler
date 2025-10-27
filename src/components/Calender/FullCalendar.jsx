import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useState } from "react";

export default function FullCalender({ leaves, lessons }) {
  const [selectedTeacherId, setSelectedTeacherId] = useState(1); // TODO: Change to null
  const [otherTeacherId, setOtherTeacherId] = useState(2);

  function formatStartDate(date) {
    const start = new Date(date);
    start.setHours(8, 0, 0, 0);
    return start;
  }
  function formatEndDate(date) {
    const start = new Date(date);
    start.setHours(20, 0, 0, 0);
    return start;
  }
  const createLessonEvent = (lesson) => ({
    title: lesson.subject.id,
    start: lesson.start_time,
    end: lesson.end_time,
    color: selectedTeacherId ? "blue" : "orange",
    extendedProps: {
      type: "lesson",
      teacher: `${lesson.teacher.first_name} ${lesson.teacher.last_name}`,
      venueName: lesson.venue.name,
      venueDesc: lesson.venue.description,
    },
  });
  const createLeaveEvent = (leave) => ({
    title: `${leave.teacher.first_name} ${leave.teacher.last_name} Leave`,
    start: formatStartDate(leave.start_date),
    end: formatEndDate(leave.end_date),
    color: selectedTeacherId ? "lightblue" : "lightorange",
    borderColor: selectedTeacherId ? "blue" : "orange",
    borderStyle: "dashed",
  });
  const lessonEvents = lessons.map((lesson) => createLessonEvent(lesson));
  const leaveEvents = leaves.map((leave) => createLeaveEvent(leave));
  const events = [...lessonEvents, ...leaveEvents];

  return (
    // <div style={{ width: "100vw", height: "100vh-6rem" }}>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      initialView="timeGridWeek"
      events={events}
      editable={false}
      selectable
      eventBackgroundColor="red"
      slotMinTime="08:00:00"
      slotMaxTime="20:00:00"
      slotDuration="00:30:00"
      height="auto"
      eventOverlap={true}
      weekends={false}
      eventDidMount={(info) => {
        console.log(info.event);
        tippy(info.el, {
          content:
            info.event.extendedProps.type === "lesson"
              ? `
            <strong>${info.event.title}</strong><br/>
            Teacher: ${info.event.extendedProps.teacher}<br/>
            Venue: ${info.event.extendedProps.venueName}<br/>
            Remarks:${info.event.extendedProps.notes || ""}
          `
              : `<strong>${info.event.title}</strong><br/>`,
          allowHTML: true,
          animation: "scale",
          theme: "light-border",
          delay: [100, 50],
          // interactive: true,
          // placement: "top",
          maxWidth: 250,
        });
      }}
      eventClick={(info) => {
        console.log(info.event._def);
      }}
    />
    // </div>
  );
}
