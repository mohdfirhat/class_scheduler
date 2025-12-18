import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import styles from "./ScheduleFullCalendar.module.css";
import "tippy.js/dist/tippy.css";
import { RenderTeacherAvatar } from "../../utils/TableFuncs";

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
  // function to format startDate for the calendar events
  function formatStartDate(date) {
    const start = new Date(date);
    start.setHours(8, 0, 0, 0);
    return start;
  }

  // function to format endDate for the calendar events
  function formatEndDate(date) {
    const start = new Date(date);
    start.setHours(20, 0, 0, 0);
    return start;
  }

  // function to choose section event color
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

  // function to choose leave event color
  const leaveColor = (leave, teacher) => {
    if (teacher.id == selectedTeacherId) {
      // https://htmlcolorcodes.com/colors/shades-of-orange/
      if (leave.status.type == "pending") {
        return "#B6D0E2"; //selected teacher and pending color(powder blue)
      } else if (leave.status.type == "approved") {
        return "#4682B4"; //selected teacher and approved color(steel blue)
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

  // function to create Section Event Object for FullCalander
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

  // function to create Tentitive Section Event Object for FullCalander
  const createTentitiveSectionEvent = (section, teacher) => ({
    title: section.course.courseCode,
    start: `${section.date.format("YYYY-MM-DD")}T${section.timeslot.startTime}`,
    end: `${section.date.format("YYYY-MM-DD")}T${section.timeslot.endTime}`,
    color: "red",
    extendedProps: {
      type: "section",
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      venueName: section.venue.name,
      venueDesc: section.venue.description,
      data: section,
      notes: section.remark,
    },
  });

  // function to create Leave Event Object for FullCalander
  const createLeaveEvent = (leave, teacher) => ({
    title: `${teacher.firstName} ${teacher.lastName} Leave (${leave.status.type.toUpperCase()})`,
    start: formatStartDate(leave.startDate),
    end: formatEndDate(leave.endDate),
    // allDay: true,
    color: leaveColor(leave, teacher),
    borderColor: teacher.id === selectedTeacherId ? "blue" : "sandybrown",
    borderStyle: "dashed",
    extendedProps: {
      type: "leave",
      data: leave,
    },
  });

  // variable for Section Events for Full Calendar
  const sectionEvents = sections ? sections.map((section) => createSectionEvent(section, teacher)) : [];

  // variable for Leave Events for Full Calendar
  const leaveEvents = leaves ? leaves.map((leave) => createLeaveEvent(leave, teacher)) : [];

  // variable for All events for Full Calendar
  const events = [...sectionEvents, ...leaveEvents];

  // if there is tentitveSection with date and time, add to events
  if (tentitiveSection && teacher && tentitiveSection.date && tentitiveSection.timeslot.id) {
    const createdTentitiveEvent = createTentitiveSectionEvent(tentitiveSection, teacher);
    events.push(createdTentitiveEvent);
  }

  return (
    <div>
      {teacher && (
        <div className={styles.titleContainer}>
          {RenderTeacherAvatar(teacher)}
          <h1>
            {teacher.firstName} {teacher.lastName} Schedule
          </h1>
        </div>
      )}
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
    </div>
  );
}
