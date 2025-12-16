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
  initialView = "timeGridWeek",
  tentitiveSection = undefined,
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

  console.log(sections);

  const sectionColour = (section, teacher) => {
    if (teacher.id == selectedTeacherId) {
      if (section.status.type == "pending") {
        return "#89CFF0"; //selected teacher and pending color(baby blue)
      } else if (section.status.type == "approved") {
        return "#0000FF"; //selected teacher and approved color(blue)
      } else {
        return "#6F8FAF"; //selected teacher and rejected color(Denim)
      }
    } else {
      if (section.status.type == "pending") {
        // https://htmlcolorcodes.com/colors/shades-of-orange/
        return "#FFC000"; //other teacher and pending color(Golden Yellow)
      } else if (section.status.type == "approved") {
        return "#CC5500"; //other teacher and approved color(Burnt Orange)
      } else {
        return "	#FFE5B4"; //other teacher and rejected color(Peach)
      }
    }
  };

  const leaveColor = (leave, teacher) => {
    if (teacher.id == selectedTeacherId) {
      // https://htmlcolorcodes.com/colors/shades-of-orange/
      if (leave.status.type == "pending") {
        return "#89CFF0"; //selected teacher and pending color(baby blue)
      } else if (leave.status.type == "approved") {
        return "#0000FF"; //selected teacher and approved color(blue)
      } else {
        return "#6F8FAF"; //selected teacher and rejected color(Denim)
      }
    } else {
      if (leave.status.type == "pending") {
        // https://htmlcolorcodes.com/colors/shades-of-orange/
        return "#FFC000"; //other teacher and pending color(Golden Yellow)
      } else if (leave.status.type == "approved") {
        return "	#CC5500"; //other teacher and approved color(Burnt Orange)
      } else {
        return "	#FFE5B4"; //other teacher and rejected color(Peach)
      }
    }
  };

  const createSectionEvent = (section, teacher) => ({
    title: `${section.course.courseCode} (${section.status.type.toUpperCase()})`,
    start: `${section.date}T${section.timeslot.startTime}`,
    end: `${section.date}T${section.timeslot.endTime}`,
    color: sectionColour(section, teacher),
    extendedProps: {
      type: "section",
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      venueName: section.venue.name,
      venueDesc: section.venue.description,
      data: section,
      notes: section.remark,
    },
  });
  const createTentitiveSectionEvent = (section, teacher) => ({
    title: section.course.courseCode,
    start: `${section.date.format("YYYY-MM-DD")}T${section.timeslot.startTime}`,
    end: `${section.date.format("YYYY-MM-DD")}T${section.timeslot.endTime}`,
    color: "darkblue",
    extendedProps: {
      type: "section",
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      venueName: section.venue.name,
      venueDesc: section.venue.description,
      data: section,
    },
  });
  const createLeaveEvent = (leave, teacher) => ({
    title: `${teacher.firstName} ${teacher.lastName} Leave (${leave.status.type.toUpperCase()})`,
    start: formatStartDate(leave.startDate),
    end: formatEndDate(leave.endDate),
    color: leaveColor(leave, teacher),
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
  // if there is tentitveSection with date and time, add to events
  if (tentitiveSection && teacher && tentitiveSection.date && tentitiveSection.timeslot.id) {
    const createdTentitiveEvent = createTentitiveSectionEvent(tentitiveSection, teacher);
    events.push(createdTentitiveEvent);
  }

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
        tippy(info.el, {
          content:
            info.event.extendedProps.type === "section"
              ? `
            <strong>${info.event.title}</strong><br/>
            Teacher: ${info.event.extendedProps.teacher}<br/>
            Venue: ${info.event.extendedProps.venueName}<br/>
            Remarks: ${info.event.extendedProps.notes || ""}
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
        if (setFormData !== undefined) {
          if (
            conflictSections.find(
              (section) =>
                section.id === info.event.extendedProps.data.id && info.event.extendedProps.type === "section"
            )
          ) {
            setFormData((oldData) => ({ ...oldData, selectedSectionId: info.event.extendedProps.data.id }));
          }
        }
      }}
    />
    // </div>
  );
}
