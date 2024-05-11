import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  UpdateAddressRequest,
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

  static async checkAddressMustExist(
    addressId: number,
    contactId: number,
    username: string
  ): Promise<Address> {
    await ContactService.checkContactMustExist(username, contactId);

    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  static async get(
    user: User,
    contactId: number,
    addressId: number
  ): Promise<AddressResponse> {
    const address = await this.checkAddressMustExist(
      addressId,
      contactId,
      user.username
    );

    return toAddressResponse(address);
  }

  static async update(
    request: UpdateAddressRequest,
    user: User,
    contactId: number
  ): Promise<AddressResponse> {
    const updateRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );

    await this.checkAddressMustExist(request.id, contactId, user.username);

    const address = await prismaClient.address.update({
      where: {
        id: request.id,
        contact_id: contactId,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }

  static async delete(
    user: User,
    addressId: number,
    contactId: number
  ): Promise<string> {
    await this.checkAddressMustExist(addressId, contactId, user.username);

    await prismaClient.address.delete({
      where: { id: addressId, contact_id: contactId },
    });

    return "OK";
  }

  static async list(user: User, contactId: number): Promise<Array<Address>> {
    await ContactService.checkContactMustExist(user.username, contactId);

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses;
  }
}
