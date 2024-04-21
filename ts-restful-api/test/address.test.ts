import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts/:contactId/addresses/", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("Should create new address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "Indonesia",
        postal_code: "111111",
      });

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.street).toBe("Jalan");
    expect(response.body.data.city).toBe("Kota");
    expect(response.body.data.province).toBe("Provinsi");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("111111");
  });

  it("Should reject create new address if request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "",
        postal_code: "",
      });

    logger.debug(response);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("Should reject create new address if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 123}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "Indonesia",
        postal_code: "111111",
      });

    logger.debug(response);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
