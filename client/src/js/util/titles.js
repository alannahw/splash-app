import _ from "lodash";

const adjs = [
  "Wistful",
  "Today’s",
  "Go-getter",
  "Thorough",
  "Elemental",
  "Theoretical",
  "Contemplative",
  "Pensive",
  "Meditative",
  "Lost",
  "Reflective",
  "Intense",
  "Tender",
  "Careful",
  "Profound",
  "Ingrained",
  "Meticulous",
  "Unfathomable",
  "Logical",
  "Inquisitive",
  "Systematic",
  "Solid",
  "Searching",
  "Perceptive",
  "Painstaking",
  "Serious",
  "Hollow",
  "Harrowing",
  "Joyful",
  "Jubilant",
  "Hungry"
];
const nouns = [
  "Beginnings",
  "Musings",
  "Plans",
  "Ideas",
  "Writings",
  "Hopes",
  "Realisations",
  "Lives",
  "Travels",
  "Wonderings",
  "Worlds",
  "Fears",
  "Intentions",
  "Fortunes",
  "Expectations",
  "Beliefs",
  "Wishes",
  "Rewards",
  "Daydreams",
  "Fancies",
  "Concerns",
  "Truths",
  "Promises",
  "Joys",
  "Suspicions",
  "Mindsets"
];

export function TitleGenerator() {
  const adj = _.sample(adjs);
  const noun = _.sample(nouns);
  return adj + " " + noun;
}
