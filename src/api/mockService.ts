import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet("/members").reply(200, {
  members: [
    {
      id: 1,
      name: "John Doe",
      role: "Developer",
      type: "Full-Time",
      country: "USA",
      salary: "$80,000",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Designer",
      type: "Part-Time",
      country: "Canada",
      salary: "$60,000",
    },
    {
      id: 3,
      name: "Jane minolr",
      role: "Designer",
      type: "Part-Time",
      country: "UK",
      salary: "$62,800",
    },
  ],
});

mock.onDelete(/^\/members\/\d+/).reply((config) => {
  const objectId = config.url?.match(/\d+/)?.[0];

  if (objectId) {
    return [200, { message: `Object ${objectId} deleted successfully` }];
  } else {
    return [404];
  }
});
