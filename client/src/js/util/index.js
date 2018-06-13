import { TitleGenerator } from "./titles";
import _ from "lodash";

export function LightenDarkenColor(col, amtstr) {
  let usePound = false;
  const amt = parseInt(amtstr);

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
export function getRandomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export function getDefaultUser(userName) {
  const user = {
    name: userName,
    settings: { listView: "thumb", sortBy: "mostrecentdate" }
  };
  return user;
}
export function getDefaultNote(userId) {
  const note = {
    title: TitleGenerator(),
    body: "",
    userId: userId,
    date: new Date().setHours(0, 0, 0, 0),
    unsplashId: getRandomNum(999),
    imgLink: ""
  };
  return note;
}

export function sortNotes(notes, order) {
  let orderedNotes = { ...notes };
  if (order === "alphabetically") {
    orderedNotes = _.orderBy(notes, ["title"], ["asc"]);
  } else if (order === "mostrecentdate") {
    orderedNotes = _.orderBy(notes, ["date"], ["desc"]);
  } else if (order === "oldestdate") {
    orderedNotes = _.orderBy(notes, ["date"], ["asc"]);
  }
  return orderedNotes;
}
export function filterNotes(notes, filter) {
  const val = filter.toLowerCase();
  let filteredNotes = notes.filter(n => {
    return (
      n.title.toLowerCase().includes(val) || n.body.toLowerCase().includes(val)
    );
  });
  return filteredNotes;
}

export function editUserSettingsProperty(user, key, value) {
  const settings = { ...user.settings, [key]: value };
  const updatedUser = { ...user, settings };
  return updatedUser;
}
