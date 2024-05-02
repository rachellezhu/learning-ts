import { User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    );

    const address = await prismaClient.address.create({
      data: createRequest,
    });

    return toAddressResponse(address);
  }

  static async get(
    user: User,
    contactId: number,
    addressId: number
  ): Promise<AddressResponse> {
    const contact = await ContactService.checkContactMustExist(
      user.username,
      contactId
    );

    console.log(contactId);

    const result = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contact.id,
      },
    });

    if (!result) {
      throw new ResponseError(404, "Address is not found");
    }

    return toAddressResponse(result);
  }

  static async update() {}

  static async delete() {}

  static async list() {}
}
