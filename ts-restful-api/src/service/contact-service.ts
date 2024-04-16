import { Contact, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    if (!createRequest.first_name) {
      throw new ResponseError(400, "Make sure to fill out the form");
    }

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const contact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(contact);
  }
  static async get(id: number, user: User): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new ResponseError(400, "Contact is not found");
    }

    return toContactResponse(contact);
  }

  static async update(
    id: number,
    request: CreateContactRequest,
    user: User
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const result = await prismaClient.contact.update({
      where: {
        id: id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toContactResponse(result);
  }
  static async delete(id: number, user: User): Promise<ContactResponse> {
    const result = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    if (!result) {
      throw new ResponseError(404, "Contact is not found. No data deleted");
    }

    return result;
  }
  static async search(request: CreateContactRequest) {}
}
