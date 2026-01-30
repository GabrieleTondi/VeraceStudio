"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
  isSameYear,
} from "date-fns";
import { it } from "date-fns/locale"; // Per avere i nomi in Italiano
import { a } from "motion/react-client";

// 1. DATI EVENTI (Usa formato YYYY-MM-DD standard per poterli confrontare)
const meetings = [
  {
    id: 1,
    name: "Inaugurazione Mostra 'Luci'",
    startDatetime: "2026-01-12T18:00", // Esempio: Cambia con date attuali/future
    endDatetime: "2026-01-12T21:00",
    location: "Verace Studio Main Hall",
  },
  {
    id: 2,
    name: "Workshop Fotografia Analogica",
    startDatetime: "2026-01-21T10:00",
    endDatetime: "2026-01-21T16:00",
    location: "Sala Pose B",
  },
  {
    id: 3,
    name: "Presentazione Nuovi Progetti",
    startDatetime: "2026-02-05T14:00", // Questo è a Febbraio
    endDatetime: "2026-02-05T15:30",
    location: "Sala Riunioni",
  },
  {
    id: 4,
    name: "Aperitivo di Networking",
    startDatetime: "2026-01-27T19:00",
    endDatetime: "2026-01-27T23:00",
    location: "Rooftop",
  },
];

export const EventsCalendar = () => {
  // STATO: Oggi e Mese Corrente
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  // Convertiamo la stringa currentMonth in oggetto Date per i calcoli
  const firstDayCurrentMonth = parseISO(currentMonth); // In realtà qui serve un trucco, vedi sotto

  // Funzioni di Navigazione
  const prevMonth = () => {
    const firstDayNextMonth = addMonths(firstDayCurrentMonth, -1);
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };
  const nextMonth = () => {
    const firstDayNextMonth = addMonths(firstDayCurrentMonth, 1);
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  // LOGICA GENERAZIONE GRIGLIA
  // 1. Troviamo l'inizio e la fine del mese visualizzato
  // Nota: usiamo parseISO o un new Date() pulito basato sullo stato
  // Per semplicità usiamo un oggetto Date derivato dallo stato stringa, o gestiamo lo stato come Date direttamente.
  // Modifico lo stato per essere un oggetto Date, è più facile.

  // --- RI-DEFINIZIONE STATO PER SEMPLICITÀ ---
  const [currentDate, setCurrentDate] = useState(new Date()); // Tiene traccia del mese che stiamo guardando

  const nextMonthAction = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonthAction = () => setCurrentDate(subMonths(currentDate, 1));

  // Calcolo intervallo giorni da mostrare
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // 1 = Lunedì
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // FILTRO EVENTI: Mostra solo eventi del mese selezionato o futuri dal giorno selezionato
  // Qui filtriamo gli eventi che appartengono al MESE che stai guardando
  //       isSameMonth(parseISO(meeting.startDatetime), currentDate) ||
  //       isSameMonth(parseISO(meeting.startDatetime), monthEnd.currentDate + 1),
  const nextMonthDate = addMonths(currentDate, 1);
  const selectedMonthMeetings = meetings
    .filter((meeting) => {
      const meetingDate = parseISO(meeting.startDatetime);
      return (
        isSameMonth(meetingDate, currentDate) ||
        isSameMonth(meetingDate, nextMonthDate)
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startDatetime).getTime() -
        new Date(b.startDatetime).getTime(),
    );

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-neutral-800">
      {/* LATO SINISTRO: CALENDARIO */}
      <div className="md:pr-14">
        {/* Intestazione Mese */}
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-semibold text-white capitalize">
            {format(currentDate, "MMMM yyyy", { locale: it })}
          </h2>
          <button
            onClick={prevMonthAction}
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextMonthAction}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Header Giorni (L M M G V S D) */}
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-neutral-500">
          <div>L</div>
          <div>M</div>
          <div>M</div>
          <div>G</div>
          <div>V</div>
          <div>S</div>
          <div>D</div>
        </div>

        {/* Griglia Giorni */}
        <div className="mt-2 grid grid-cols-7 text-sm">
          {calendarDays.map((day, dayIdx) => {
            // Verifica se c'è un evento in QUESTO giorno specifico
            const hasEvent = meetings.some((meeting) =>
              isSameDay(parseISO(meeting.startDatetime), day),
            );

            return (
              <div
                key={day.toString()}
                className={cn(
                  dayIdx > 6 && "", // Rimosso bordo per pulizia visiva
                  "py-2",
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    // Logica selezione e colori
                    isSameDay(day, selectedDay) && "text-white bg-red-600",
                    !isSameDay(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500",
                    !isSameDay(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, currentDate) &&
                      "text-neutral-200",
                    !isSameDay(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, currentDate) &&
                      "text-neutral-600", // Giorni mese precedente/successivo
                    isSameDay(day, selectedDay) && isToday(day) && "bg-red-600",
                    !isSameDay(day, selectedDay) && "hover:bg-neutral-800",
                    (isSameDay(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full transition-colors relative",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>

                  {/* Pallino evento */}
                  {hasEvent && !isSameDay(day, selectedDay) && (
                    <div className="w-1 h-1 bg-red-500 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                  )}
                  {hasEvent && isSameDay(day, selectedDay) && (
                    <div className="w-1 h-1 bg-white rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* LATO DESTRO: LISTA EVENTI */}
      <section className="mt-12 md:mt-0 md:pl-14">
        <h2 className="text-base font-semibold leading-6 text-white mb-6">
          Eventi di {format(currentDate, "MMMM", { locale: it })} e{" "}
          {format(addMonths(currentDate, 1), "MMMM", { locale: it })}
        </h2>

        {selectedMonthMeetings.length > 0 ? (
          <ol className="space-y-6 text-sm leading-6 text-neutral-500">
            {selectedMonthMeetings.map((meeting) => {
              const start = parseISO(meeting.startDatetime);
              const end = parseISO(meeting.endDatetime);

              return (
                <li
                  key={meeting.id}
                  className="group relative flex gap-x-6 rounded-xl p-4 hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-800"
                >
                  {/* Data */}
                  <div className="flex-none w-16 text-center">
                    <div
                      className={cn(
                        "text-2xl font-bold",
                        isSameDay(start, selectedDay)
                          ? "text-red-500"
                          : "text-neutral-300",
                      )}
                    >
                      {format(start, "d")}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-neutral-500">
                      {format(start, "MMM", { locale: it })}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-auto">
                    <h3 className="pr-10 font-semibold text-white xl:pr-0 group-hover:text-red-400 transition-colors">
                      {meeting.name}
                    </h3>
                    <dl className="mt-2 flex flex-col text-neutral-400 xl:flex-row xl:gap-4">
                      <div className="flex items-start gap-x-2">
                        <Clock className="h-4 w-4 mt-0.5 text-neutral-500" />
                        <dt className="sr-only">Orario</dt>
                        <dd>
                          {format(start, "HH:mm")} - {format(end, "HH:mm")}
                        </dd>
                      </div>
                      <div className="mt-2 flex items-start gap-x-2 xl:mt-0">
                        <MapPin className="h-4 w-4 mt-0.5 text-neutral-500" />
                        <dt className="sr-only">Luogo</dt>
                        <dd>{meeting.location}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-neutral-500">
            <CalendarIcon className="w-10 h-10 mb-2 opacity-20" />
            <p>Nessun evento in programma questo mese.</p>
          </div>
        )}
      </section>
    </div>
  );
};
