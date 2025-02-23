import { randBetweenDate, randCompanyName, randEmail, randFirstName, randLastName, randNumber, randPhoneNumber, randStreetAddress } from '@ngneat/falso';
import zipcodes from 'zipcodes';

export namespace UserData {
  export type User = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    birthDate: Date;
    newsletter: boolean;
    offers: boolean;
    company: string;
    address: string;
    address2: string;
    location: {
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    mobileNumber: string;
  };
  export function randomizeBirthday() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, 0, 1); // 18 years ago, January 1st
    const minDate = new Date(today.getFullYear() - 70, 0, 1); // 70 years ago, January 1st
    return randBetweenDate({ from: minDate, to: maxDate });
  }
  export function getRandomZipcode() {
    const randomZipcode = zipcodes.random();
    return {
      zip: randomZipcode.zip,
      city: randomZipcode.city,
      state: randomZipcode.state,
      country: randomZipcode.country
    };
  }
  export function getCountryFromCode(code: string): string {
    if (code === 'US') {
      return 'United States';
    }
    if (code === 'Canada') {
      return 'Canada';
    }
    throw new Error(`Country code ${code} not found`);
  }
  export function createUser(): User {
    const testUser: UserData.User = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      birthDate: new Date(),
      newsletter: true,
      offers: true,
      company: '',
      address: '',
      address2: '',
      location: {
        zip: '',
        city: '',
        state: '',
        country: ''
      },
      mobileNumber: ''
    };
    testUser.firstName = randFirstName({ withAccents: false });
    testUser.lastName = randLastName({ withAccents: false });
    testUser.userName = `${testUser.firstName}.${testUser.lastName}`.toLowerCase();
    testUser.email = randEmail({ firstName: testUser.firstName, lastName: testUser.lastName, nameSeparator: '.', provider: 'test-email', suffix: 'com' });
    testUser.password = process.env.GLOBAL_PASSWORD as string;
    testUser.birthDate = randomizeBirthday();
    testUser.company = randCompanyName();
    testUser.address = randStreetAddress();
    testUser.address2 = `Suite ${randNumber({ min: 1, max: 9999 })}`;
    testUser.location = getRandomZipcode();
    testUser.mobileNumber = randPhoneNumber();
    return testUser;
  }
}
export default { UserData };
