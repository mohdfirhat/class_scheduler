import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function ScheduleFullCalendar({
  leaves,
  sections,
  teacher,
  selectedTeacherId,
  initialView,
  initialDate = undefined,
  ref = undefined,
  setFormData = undefined,
  conflictSections = undefined,
}) {
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

  const createSectionEvent = (section, teacher) => ({
    title: section.course.courseCode,
    start: `${section.date}T${section.timeslot.startTime}`,
    end: `${section.date}T${section.timeslot.endTime}`,
    color: teacher.id === selectedTeacherId ? "blue" : "darkorange",
    extendedProps: {
      type: "section",
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      venueName: section.venue.name,
      venueDesc: section.venue.description,
      data: section,
    },
  });
  const createLeaveEvent = (leave, teacher) => ({
    title: `${teacher.firstName} ${teacher.lastName} Leave`,
    start: formatStartDate(leave.startDate),
    end: formatEndDate(leave.endDate),
    color: teacher.id === selectedTeacherId ? "lightblue" : "sandybrown",
    borderColor: teacher.id === selectedTeacherId ? "blue" : "sandybrown",
    borderStyle: "dashed",
    extendedProps: {
      type: "leave",
      data: leave,
    },
  });
  const sectionEvents = sections ? sections.map((section) => createSectionEvent(section, teacher)) : [];
  const leaveEvents = leaves ? leaves.map((leave) => createLeaveEvent(leave, teacher)) : [];
  const events = [...sectionEvents, ...leaveEvents];
  console.log("events");
  console.log(events);

  return (
    // <div style={{ width: "100vw", height: "100vh-6rem" }}>
    <FullCalendar
      ref={ref}
      initialDate={initialDate}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView={initialView}
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
        // console.log(info.event);
        tippy(info.el, {
          content:
            info.event.extendedProps.type === "section"
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
        console.log(`Clicked Section with id: ${info.event.extendedProps.data.id}`);
        if (setFormData !== undefined) {
          if (
            conflictSections.find(
              (section) =>
                section.id === info.event.extendedProps.data.id && info.event.extendedProps.type === "section"
            )
          ) {
            console.log("It is a conflicting Section");
            setFormData((oldData) => ({ ...oldData, selectedSectionId: info.event.extendedProps.data.id }));
          }
        }
      }}
    />
    // </div>
  );
}
