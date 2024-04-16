import { NextFunction, Request, Response } from "express";
import { CreateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { User } from "@prisma/client";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId: number = Number(req.params.contactId);
      const response = await ContactService.get(contactId, req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId: number = Number(req.params.contactId);
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.update(
        contactId,
        request,
        req.user!
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
      const contactId: number = Number(req.params.contactId);
      const response = await ContactService.delete(contactId, req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
