import { Context } from "aws-lambda";
import { main } from "./handler";

//TODO: fix test config

const MOCK_PARAMS = {
  event: { pathParameters: { id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0" } },
  context: {
    awsRequestId: "9e8a207c-1f99-4b9b-a413-02beb6250895",
    invokeid: "id",
    logGroupName: "/aws/lambda/product-service-dev-getProductsList",
    logStreamName: "2015/09/22/[HEAD]13370a84ca4ed8b77c427af260",
    functionVersion: "HEAD",
    invokedFunctionArn: "123",
    isDefaultFunctionVersion: true,
    functionName: "product-service-dev-getProductsList",
    memoryLimitInMB: "1024",
    callbackWaitsForEmptyEventLoop: false,
    identity: {
      cognitoIdentityId: "test-id",
      cognitoIdentityPoolId: "test-id",
    },
    clientContext: {
      client: {
        installationId: "1",
        appTitle: "1",
        appVersionName: "1",
        appVersionCode: "2",
        appPackageName: "3",
      },
      env: {
        platformVersion: "1",
        platform: "1",
        make: "1",
        model: "1",
        locale: "1",
      },
    },
    getRemainingTimeInMillis: () => 1,
    done: () => {},
    fail: (error) => {},
    succeed: (messageOrObject) => {},
  } as Context,
  callback: undefined,
};

const MOCK_RESULT = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: {
    data: [
      {
        count: 43,
        description: "Sepultura, Crowbar, Sacred Reich, Art Of Shock",
        date: "2021-04-04T08:00:00.000Z",
        location: "8001 S Eastern Ave, 73149 Oklahoma City Oklahoma, USA",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        price: 2.4,
        title: "Sepultura - Quadra Tour 2021",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/sepulturaquadratour.webp",
      },
      {
        count: 198,
        description: "Humanity's Last Breath",
        date: "2021-04-02T08:00:00.000Z",
        location: "Stockholm Sodermanland, Sweden",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
        price: 10,
        title: "Humanity's Last Breath - Tour 2021",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/humanityslastbreathtour.webp",
      },
      {
        count: 25,
        description: "Sound Of Sabbath",
        date: "2022-01-08T08:00:00.000Z",
        location: "9-11 Fountain Street, BT1 5EA Belfast, Northern Ireland",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        price: 23,
        title: "Sound Of Sabbath - Tour 2022",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/soundofsabbathtour.webp",
      },
      {
        count: 11,
        description: "My Dying Bride, Marduk, Wormwood, Grave, etc.",
        date: "2022-04-17T08:00:00.000Z",
        location: "Reitknechtstr. 6, 80639 München Bayern, Germany",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        price: 15,
        title: "Dark Easter Metal Meeting 2021",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/darkeastermetalmeeting.webp",
      },
      {
        count: 78,
        description: "Biffy Clyro, Iron Maiden, Kiss",
        date: "2022-06-12T08:00:00.000Z",
        location: "DE74 2RP Castle Donington, England",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        price: 23,
        title: "Download Festival 2022",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/downloadfest.webp",
      },
      {
        count: 8,
        description:
          "Korn, Deftones, Celeste, Dark Funeral, Heaven Shall Burn, etc.",
        date: "2021-06-05T08:00:00.000Z",
        location: "Avenida Ramón Canosa, 27863 Viveiro Galicia, Spain",
        id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        price: 15,
        title: "Resurrection Fest 2021",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/resurrectionfest.webp",
      },
      {
        count: 230,
        description:
          "Event rescheduled. Old Date: 2021-06-11. New date: 2022-06-03",
        date: "2022-06-05T08:00:00.000Z",
        location: "Boulevard 1, 53520 Nürburg Rheinland-Pfalz, Germany",
        id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        price: 23,
        title: "Rock am Ring 2022",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/rockamring.webp",
      },
      {
        count: 149,
        description: "Slipknot, Amon Amarth, Pestilence, Neaera, etc.",
        date: "2021-07-31T08:00:00.000Z",
        location: "Hauptstraße 82, 25596 Wacken Schleswig-Holstein, Germany",
        id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        price: 15,
        title: "Wacken Open Air 2021",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/wacken.webp",
      },
      {
        count: 60,
        description:
          "Faith No More, Deftones, Cro-Mags, Suicidal Tendencies, etc.",
        date: "2021-06-19T08:00:00.000Z",
        location: "Route de la Dourie, 44190 Clisson, Pays de la Loire, France",
        id: "b39bcd7a-cd0a-41f4-8ecd-fd18d5a0f873",
        price: 25,
        title: "Hellfest 2022",
        image:
          "https://metal-tickets-store-pics-bucket.s3-eu-west-1.amazonaws.com/hellfest.webp",
      },
    ],
  },
};

describe("lambda getProductsById", () => {
  it("lambda getProductsById with path params runs corretly", async () => {
    expect(
      main(MOCK_PARAMS.event, MOCK_PARAMS.context, MOCK_PARAMS.callback)
    ).toBe(MOCK_RESULT);
  });
});
