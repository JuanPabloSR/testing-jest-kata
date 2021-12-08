import { createEvent } from "./functions";
beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("2021-12-07T10:20:30Z").getTime());
});

test("Validation a event title and content basic", () => {
  const result = createEvent(weekday, week, openHour, closeHour);

  expect(result.title).toBe("[SOFKA U] Meeting Room");
  expect(result.description).toBe("Mentoring and Practice");
  expect(result.duration).toEqual([10, "hour"]);
});

test("Validation start date", () => {
  const numDayPrueba = NUM_DAY[weekday];
  const currentDayPrueba = new Date().getDay();

  const iniciarTest = getDateCalendar(numDayPrueba, currentDayPrueba);
  const resultado = createEvent(weekday, week, openHour, closeHour);
  expect(resultado.start).toStrictEqual(iniciarTest);
});

test("Validation date", () => {
  const tiempo = Date.now();
  const date = new Date(tiempo);
  const fechaTest = new Date(date).toLocaleString("es-ES", options);
  let resultado = createEvent(weekday, week, openHour, closeHour);
  expect(resultado.date).toBe(fechaTest);
});

test("Validation illegal arguments", () => {
  const weekday = "alv";
  const week = -2;
  const openHour = -6;
  const closeHour = -4;
  if (
    closeHour - openHour < 0 ||
    week < 0 ||
    !Object.keys(NUM_DAY).some((key) => key === weekday)
  ) {
    const error = () => {
      createEvent(weekday, week, openHour, closeHour);
    };
    expect(error).toThrow(Error);
  }
});

const title = "[SOFKA U] Meeting Room";
const description = "Mentoring and Practice";
test("create an event list of at least 10 events", () => {
  listaEventos.map((evento) => {
    const resultado = createEvent(
      evento.weekday,
      evento.week,
      evento.openHour,
      evento.closeHour
    );
    expect(resultado.title).toBe(title);
    expect(resultado.description).toBe(description);
    expect(resultado.duration).toEqual([
      evento.closeHour - evento.openHour,
      "hour",
    ]);
  });
});

const weekday = "tue";
const week = 1;
const openHour = 8;
const closeHour = 18;

const NUM_DAY = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };

const hour = new Date().getHours();

const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};

function addDays(days) {
  return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
  if (numDay >= currentDay && parseInt(closeHour) >= hour) {
    //posterior a dia de la semana
    return addDays(numDay - currentDay + 7 * (week - 1));
  }
  return addDays(numDay - currentDay + 7 * (week - 1));
}

const listaEventos = [
  {
    weekday: "mon",
    week: 2,
    openHour: 10,
    closeHour: 12,
  },
  {
    weekday: "tue",
    week: 2,
    openHour: 10,
    closeHour: 12,
  },
  {
    weekday: "sat",
    week: 5,
    openHour: 12,
    closeHour: 16,
  },
  {
    weekday: "thu",
    week: 1,
    openHour: 10,
    closeHour: 11,
  },
  {
    weekday: "sun",
    week: 3,
    openHour: 5,
    closeHour: 7,
  },
  {
    weekday: "fri",
    week: 7,
    openHour: 8,
    closeHour: 10,
  },
  {
    weekday: "sun",
    week: 1,
    openHour: 7,
    closeHour: 11,
  },
  {
    weekday: "tue",
    week: 12,
    openHour: 7,
    closeHour: 14,
  },
];
