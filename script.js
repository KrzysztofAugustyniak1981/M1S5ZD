const startData = [
  {
    firstName: false,
    lastName: 2,
  },
  {
    firstName: "Roman",
    lastName: "Kowalski",
  },

  {
    firstName: "Halina",
    lastName: "Malina",
  },
  {
    firstName: "B",
    lastName: "22",
  },
  {
    firstName: "Jan",
    lastName: "Nowak",
  },
  {
    firstName: "Kamil",
    lastName: null,
  },
];
function nickNameFactory(person) {
  if (!Array.isArray(person)) return [];

  return person.map(person => {
    const { firstName, lastName } = person;

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      firstName.trim().length < 3 ||
      lastName.trim().length < 3
    ) {
      return { ...person }; // jeśli źle
    }

    const partName = firstName.trim().slice(-3).split("").reverse().join("");

    const partLastname = lastName.trim().slice(0, 3).split("").reverse().join("");

    const nicknameHalfway = partName + partLastname;
    const nickname =
      nicknameHalfway.charAt(0).toUpperCase() +
      nicknameHalfway.slice(1).toLowerCase();

    return { ...person, nickname };
  });
}
const peopleWithNicknames = nickNameFactory(startData);

function secondTask(data) {
  const filteredData = data.filter(p => p.nickname);
  return filteredData.map((person, index) => {
    const first = typeof person.firstName === "string" ? person.firstName.trim().length : 0;
    const last = typeof person.lastName === "string" ? person.lastName.trim().length : 0;

    const sumLetters = first + last;

    if (sumLetters % 2 === 0) {
      return { ...person, age: sumLetters };
    }
    const keySum = Object.keys(person).reduce((acc, key) => acc + key.length, 0);
    const divisor = index === 0 ? 1 : index;
    const age = Math.ceil(keySum / divisor);

    return { ...person, age };
  });
}

function mostCommonLetter(peopleWithNicknames) {
  peopleWithNicknames = secondTask(peopleWithNicknames);
  return peopleWithNicknames.map(person => {
    const allInOne = (person.firstName + person.lastName + person.nickname).toLowerCase();
    const counts = {};
    for (const char of allInOne) {
      if (/[a-ząćęłńóśźż]/i.test(char)) { // tylko litery
        counts[char] = (counts[char] || 0) + 1;
      }
    }
    let maxCount = 0;
    for (const c in counts) {
      if (counts[c] > maxCount) {
        maxCount = counts[c];
      }
    }
    const mostFrequentLetters = Object.keys(counts)
      .filter(letter => counts[letter] === maxCount)
      .sort();

    const letter = mostFrequentLetters[0];
    return { ...person,
      mostCommonLetter: { letter, count: maxCount }
    };
    
  })
}

console.log("wynik",mostCommonLetter(peopleWithNicknames));

