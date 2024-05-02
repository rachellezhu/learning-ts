import { Address, Contact, User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { toAddressResponse } from "../src/model/address-model";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}

export class ContactTest {
  static async create() {
    await prismaClient.contact.createMany({
      data: [
        {
          first_name: "test",
          last_name: "test",
          email: "test@example.com",
          phone: "0898989",
          username: "test",
        },
        {
          first_name: "test1",
          last_name: "test1",
          email: "test1@example.com",
          phone: "08989891",
          username: "test",
        },
        {
          first_name: "test2",
          last_name: "test2",
          email: "test2@example.com",
          phone: "08989892",
          username: "test",
        },
      ],
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test",
        first_name: "test",
      },
    });

    if (!contact) {
      throw new Error("Contact is not found");
    }

    return contact;
  }

  static async deleteAll() {
    await prismaClient.contact.deleteMany();
  }

  static async search(id: number, username: string): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: id,
        username: username,
      },
    });

    return contact!;
  }
}

export class AddressTest {
  static async deleteAll() {
    await prismaClient.address.deleteMany();
  }

  static async create() {
    const contact = await ContactTest.get();

    await prismaClient.address.create({
      data: {
        street: "Jalan",
        city: "Kota",
        province: "Provinsi",
        country: "Negara",
        postal_code: "123123",
        contact_id: contact.id,
      },
    });
  }

  static async get(): Promise<Address> {
    const contact = await ContactTest.get();

    const address = await prismaClient.address.findFirst({
      where: {
        street: "Jalan",
      },
    });

    if (!address) {
      throw new Error("Address is not found");
    }

    return address;
  }
}
