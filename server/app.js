import { faker } from '@faker-js/faker';
import * as fs from 'fs';

const generatePersonsData = (number) => {
  const persons = [];
  let i = 1;

  while (i <= number) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

    persons.push({
      id: i,
      userName: faker.internet.userName(firstName, lastName),
      firstName: firstName,
      lastName: lastName,
      phoneNumer: faker.phone.phoneNumber('###-###-####'),
      userCreatedDate: faker.date.future(),
    });

    i++;
  }

  return persons;
};

fs.writeFileSync(
  "./db.json",
  JSON.stringify({ users: generatePersonsData(40) }, null, 2)
);