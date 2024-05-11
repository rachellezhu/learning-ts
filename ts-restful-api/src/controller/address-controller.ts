import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressService } from "../service/address-service";
import { logger } from "../application/logging";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = Number(req.params.contactId);

      const response = await AddressService.create(req.user!, request);
      logger.debug("Request : " + JSON.stringify(request));
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      const addressId = Number(req.params.addressId);

      const response = await AddressService.get(
        req.user!,
        contactId,
        addressId
      );
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      const request = req.body as UpdateAddressRequest;
      request.id = Number(req.params.addressId);

      const response = await AddressService.update(
        request,
        req.user!,
        contactId
      );
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const addressId = Number(req.params.addressId);
      const contactId = Number(req.params.contactId);

      const response = await AddressService.delete(
        req.user!,
        addressId,
        contactId
      );
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      const response = await AddressService.list(req.user!, contactId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
