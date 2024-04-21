import supertest from "supertest";
import { ContactTest, UserTest } from "./test-utils";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("Should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Rachelle",
        last_name: "Zhu",
        email: "test@test.com",
        phone: "0898989",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Rachelle");
    expect(response.body.data.last_name).toBe("Zhu");
    expect(response.body.data.email).toBe("test@test.com");
    expect(response.body.data.phone).toBe("0898989");
  });

  it("Should not create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: null,
        last_name: "Zhu",
        email: "test",
        phone: "08989890898989089898908989890898989",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("Should be able to get contact with given param/id", async () => {
    const contact = await ContactTest.get();
    console.log(`Contact ID: ${contact.id}`);
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
  });

  it("Should not be able to get contact with unregistered id/params", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 123}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.error).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("Should be able to update the contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        id: contact.id,
        first_name: "Roy",
        last_name: "Zhu",
        email: "rachellezhu@gmail.com",
        phone: "089",
      });

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("Roy");
    expect(response.body.data.last_name).toBe("Zhu");
    expect(response.body.data.email).toBe("rachellezhu@gmail.com");
    expect(response.body.data.phone).toBe("089");
  });

  it("Should not be able to update the contact if the request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        id: contact.id,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });

    logger.debug(response);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("Should be able to delete the contact with given id/params", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
    expect(await ContactTest.search(contact.id, contact.username)).toBeNull();
  });

  it("Should not be able to delete the unregistered contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 50}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts?", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("Should be able to get all data without giving any params", async () => {
    const response = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("Should be able to search contact based on name", async () => {
    const response = await supertest(web)
      .get(`/api/contacts?size=10&page=1&name=test1`)
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.at(0).first_name).toBe("test1");
    expect(response.body.data.at(0).last_name).toBe("test1");
    expect(response.body.data.at(0).email).toBe("test1@example.com");
    expect(response.body.data.at(0).phone).toBe("08989891");
  });

  it("Should be able to search contact based on phone", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "891",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.at(0).first_name).toBe("test1");
    expect(response.body.data.at(0).last_name).toBe("test1");
    expect(response.body.data.at(0).email).toBe("test1@example.com");
    expect(response.body.data.at(0).phone).toBe("08989891");
  });

  it("Should be able to search contact based on email", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test1",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.at(0).first_name).toBe("test1");
    expect(response.body.data.at(0).last_name).toBe("test1");
    expect(response.body.data.at(0).email).toBe("test1@example.com");
    expect(response.body.data.at(0).phone).toBe("08989891");
  });

  it("Should be no result if the data doesn't exist", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test5",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.total_page).toBe(0);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("Should be 3 pages", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        size: 1,
        page: 3,
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.total_page).toBe(3);
    expect(response.body.paging.current_page).toBe(3);
    expect(response.body.paging.size).toBe(1);
  });
});
