let config = {};

fetch("./calendar.json")
  .then((res) => res.json())
  .then((res) => {
    console.log("config : ", res);
    config = res;
    init();
  })
  .catch((err) => {
    console.log(err);
  });

function Calendar(container) {
  this.container = container;
  this.events = [];
  this.init();
}

Calendar.prototype.init = function () {
  this.render();
  fetch("./events.json")
    .then((res) => res.json())
    .then((res) => {
      this.events = this.parseEvents(res);
      this.addEvents();
    })
    .catch((err) => console.log(err));
};

Calendar.prototype.render = function () {
  const calendar = document.createElement("div");
  calendar.classList.add("calendar");

  const left = document.createElement("div");
  left.id = "left";
  left.classList.add("left");
  const right = document.createElement("div");
  right.id = "right";
  right.classList.add("right");

  for (let h of config.hours) {
    const leftSlot = document.createElement("div");
    leftSlot.classList.add("slot");
    leftSlot.classList.add("slot-left");
    const hour = document.createElement("span");
    hour.classList.add("hour");
    hour.innerHTML = h === "0000" ? "" : h;
    leftSlot.appendChild(hour);
    left.appendChild(leftSlot);

    const rightSlot = document.createElement("div");
    rightSlot.classList.add("slot");
    rightSlot.classList.add("slot-right");
    right.appendChild(rightSlot);
  }
  calendar.appendChild(left);
  calendar.appendChild(right);
  this.container.appendChild(calendar);
};

Calendar.prototype.addEvents = function () {
  console.log("events : ", this.events);
  const right = document.querySelector("#right");
  let z = 1;
  for (let e of this.events) {
    const event = document.createElement("div");
    event.classList.add("event");
    event.style.background = e.color;
    event.style.zIndex = z++;
    event.style.width = `${e.width}%`;
    event.style.height = `${e.height}px`;
    event.style.top = `${e.top}px`;
    event.style.left = `${e.left}%`;
    const title = document.createElement("div");
    title.innerHTML = e.title;
    const time = document.createElement("div");
    time.innerHTML = `${e.startTime} - ${e.endTime}`;
    event.appendChild(title);
    event.appendChild(time);
    right.appendChild(event);
  }
};

Calendar.prototype.parseEvents = function (events) {
  // Add start and end time in number
  for (let e of events) {
    e.start = +e.startTime.split(":").join("");
    e.end = +e.endTime.split(":").join("");
  }

  // Sort events by end time
  events.sort((a, b) => {
    if (a.end === b.end) {
      return a.start - b.start;
    }
    return a.end - b.end;
  });

  // Group conflicting events
  const parsed = [];
  let i = 0;
  while (i < events.length) {
    let arr = [events[i]];
    let j = i + 1;
    while (j < events.length) {
      const e1 = arr[arr.length - 1];
      const e2 = events[j];
      if (e2.start > e1.end) break;
      arr.push(events[j]);
      j++;
    }
    parsed.push(arr);
    i = j;
  }

  // Calculate size and position for events
  for (const group of parsed) {
    for (let i = 0; i < group.length; i++) {
      const e = group[i];
      e.width = 100 / group.length;
      e.top = Math.floor(e.start / 100) * 100 + ((e.start % 100) / 60) * 100;
      e.left = (i * e.width) / 2;
      const diff = e.end - e.start;
      e.height = Math.floor(diff / 100) * 100 + ((diff % 100) / 60) * 100;
    }
  }

  return parsed.flat();
};

const init = function () {
  const container = document.querySelector("#container");
  new Calendar(container);
};
