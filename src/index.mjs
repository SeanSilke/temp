import input from "../data/input";

function genRandomSolution(devices) {
  //select starting houwr for device
  const schedule = [];
  for (let device of devices) {
    const startingHowr = selectStartingHowr(devices);
    schedule.push(generateDeviceSchedule(device, startingHowr));
  }
  console.log("schedule::: ", schedule);
  // checkMaxPower(devices, schedule);
}

function checkMaxPower(devices, schedule) {
  let devicesCount = devices.length;
  for (let i = 23; i < 24; i++) {
    console.log("i", i);
    let mapPower = 0;
    for (let j = 0; j < devices.length; j++) {
      mapPower = mapPower + schedule[j][i] * devices[j].power;
    }
    console.log("mapPower", mapPower);
  }
}

export function sum(a, b) {
  return a + b;
}

export function selectStartingHowr(device) {
  // TODO: Проверить что есть значения начинающиеся с 0;
  const { mode, duration } = device;
  if (mode === "day") {
    let slot = 21 - 7 - duration;
    let time = 7 + Math.floor((slot + 1) * Math.random());
    return time;
  } else if (mode === "night") {
    let nightDuration = 10;
    let nightStart = 21;
    let nightEnds = 7;
    let time = 21 + Math.floor((nightDuration - duration + 1) * Math.random());
    if (time >= 24) time = time - 24;
    return time;
  }
  return Math.floor(24 * Math.random() + 1);
}

function generateDeviceSchedule(device, startingHowr) {
  let schedule = new Array(23);
  schedule.fill(0);
  console.log("startingHowr", startingHowr);
  let { duration } = device;
  while (duration > 0) {
    schedule[startingHowr - 1] = 1;
    duration = duration - 1;
    startingHowr = startingHowr == 23 ? 1 : startingHowr + 1;
  }
  return schedule;
}

genRandomSolution(input.devices);
