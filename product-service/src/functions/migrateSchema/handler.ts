import "source-map-support/register";

import { Client } from "pg";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";

export const migrateSchema = (client: Client) => async (event, _context) => {
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id UUID DEFAULT uuid_generate_v4 (),
                count INT
                date TEXT,
                description TEXT,
                image TEXT,
                location TEXT,
                price INT,
                title TEXT,
            );
        `);
    // await client.query(`
    //         INSERT INTO products (count, date, description, image, location, price, title) values
    //         (43,'Sepultura, Crowbar, Sacred Reich, Art Of Shock', '2021-04-04T08:00:00.000Z', '8001 S Eastern Ave, 73149 Oklahoma City Oklahoma, USA'),
    //         ('Product 2','Product 2 description', 2000, 'https://r2.readrate.com/img/pictures/basic/792/792600/7926008/w800h317-89405d1d.jpg', 2),
    //         ('Product 3','Product 3 description', 3000, 'https://r5.readrate.com/img/pictures/basic/792/792600/7926009/w800h317-da60182f.jpg', 3),
    //         ('Product 4','Product 4 description', 4000, 'https://r2.readrate.com/img/pictures/basic/792/792601/7926010/w800h317-04d81319.jpg', 4),
    //         ('Product 5','Product 5 description', 5000, 'https://r2.readrate.com/img/pictures/basic/792/792601/7926014/w800h317-a1bf3137.jpg', 5),
    //         ('Product 6','Product 6 description', 6000, 'https://r5.readrate.com/img/pictures/basic/792/792601/7926015/w800h317-8f4d4f25.jpg', 6);
    //     `);

    await client.query(`
            INSERT INTO products (count, date, description, image, location, price, title) values
            (43, '2021-04-04T08:00:00.000Z', 'Sepultura, Crowbar, Sacred Reich, Art Of Shock', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/sepulturaquadratour.webp', '8001 S Eastern Ave, 73149 Oklahoma City Oklahoma, USA', 2.4, 'Sepultura - Quadra Tour 2021'),
            (198, '2021-04-02T08:00:00.000Z', 'Humanity's Last Breath', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/humanityslastbreathtour.webp', 'Stockholm Sodermanland, Sweden', 10, 'Humanity's Last Breath - Tour 2021'),
            (25, '2022-01-08T08:00:00.000Z', 'Sound Of Sabbath', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/soundofsabbathtour.webp', '9-11 Fountain Street, BT1 5EA Belfast', 'Northern Ireland', 23, 'Sound Of Sabbath - Tour 2022'),
            (11, '2022-04-17T08:00:00.000Z', 'My Dying Bride, Marduk, Wormwood, Grave, etc.', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/darkeastermetalmeeting.webp', 'Reitknechtstr. 6, 80639 München Bayern, Germany', 15, 'Dark Easter Metal Meeting 2021'),
            (78, '2022-06-12T08:00:00.000Z', 'Biffy Clyro, Iron Maiden, Kiss', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/downloadfest.webp', 'DE74 2RP Castle Donington, England', 23, 'Download Festival 2022'),
            (8, '2021-06-05T08:00:00.000Z', 'Korn, Deftones, Celeste, Dark Funeral, Heaven Shall Burn, etc.', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/resurrectionfest.webp', 'Avenida Ramón Canosa, 27863 Viveiro Galicia, Spain', 15, 'Resurrection Fest 2021'),
            (230, '2022-06-05T08:00:00.000Z', 'Event rescheduled. Old Date: 2021-06-11. New date: 2022-06-03', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/rockamring.webp', 'Boulevard 1, 53520 Nürburg Rheinland-Pfalz, Germany', 23, 'Rock am Ring 2022'),
            (149, '2021-07-31T08:00:00.000Z', 'Slipknot, Amon Amarth, Pestilence, Neaera, etc.', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/wacken.webp', 'Hauptstraße 82, 25596 Wacken Schleswig-Holstein, Germany', 15, 'Wacken Open Air 2021'),
            (60, '2021-06-19T08:00:00.000Z', 'Faith No More, Deftones, Cro-Mags, Suicidal Tendencies, etc.', 'https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/hellfest.webp', 'Route de la Dourie, 44190 Clisson, Pays de la Loire, France', 25, 'Hellfest 2022');
        `);
    return formatSuccessResponse({});
  } catch (err) {
    return formatErrorResponse(err);
  } finally {
    client.end();
  }
};
