import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-utils";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("Should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("Should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "Test Test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test Test");
  });
});

describe("POST /api/user/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("Should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it("Should reject login user if the username is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("Should reject login user if the password is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("Should be able to get user data", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it("Should not be able to get user data if the token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("Should reject update user if the update request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "",
        name: "",
      });

    logger.debug(response);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("Should reject update user if the token is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "salah")
      .send({
        password: "benar",
        name: "benar",
      });

    logger.debug(response);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("Should be able to update the user password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "benar",
      });

    const user = await UserTest.get();

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(await bcrypt.compare("benar", user.password)).toBe(true);
  });

  it("Should be able to update the user name", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "benar",
      });

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("benar");
  });

  it("Should be able to update the user name and password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "benar",
        password: "benar",
      });

    const user = await UserTest.get();

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(await bcrypt.compare("benar", user.password)).toBe(true);
    expect(response.body.data.name).toBe("benar");
  });
});

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("Should be able to logout", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    const user = UserTest.get();

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
    expect((await user).token).toBe(null);
  });

  it("Should not be able to logout if the token is invalid", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
