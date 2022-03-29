import { faker } from '@faker-js/faker';
import * as fs from 'fs';

const generatePersonsData = (number) => {
  const persons = [];
  let i = 1;

  while (i <= number) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      let date = faker.date.between('2015-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z');
      date = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();

    persons.push({
      id: i,
      username: faker.internet.userName(firstName, lastName),
      firstName: firstName,
      lastName: lastName,
      phoneNumber: faker.phone.phoneNumber('###-###-####'),
      accountCreatedDate: date,
    });

    i++;
  }

  return persons;
};

fs.writeFileSync(
  "./db.json",
  JSON.stringify({ users: generatePersonsData(40) }, null, 2)
);