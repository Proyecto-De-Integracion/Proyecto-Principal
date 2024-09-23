import { publications } from "../models/publications.model.js";
import { deletesFiles } from "../utils/deletePath.js";
import {
  multimediaFormat,
  singlMediaFormat,
} from "../utils/savePublications.js";
import fs from "fs-extra";
import { login } from "./user.controllers.js";
import { validatorId } from "../middlewares/validatorId.js";
import mongoose from "mongoose";

export const getPublications = async (req, res) => {
  try {
    const publicCollections = await publications.find();
    res.status(200).json(publicCollections);
  } catch (error) {
    console.log(error);
  }
};

export const getPublicationsById = async (req, res) => {
  try {
    const { _id } = req.params.id;
    const publicationsSearched = await publications.findOne(_id).exec();
    res.status(200).json(publicationsSearched);
  } catch (error) {
    console.log(error);
  }
};

export const createPublications = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const idUser = req.user._id;
    if (req.files?.media) {
      const mediaFiles = req.files.media;
      const identifier = Array.isArray(mediaFiles);
      if (identifier) {
        const mimetypes = mediaFiles.map((Element) => {
          return Element.mimetype;
        });
        const tempFilePaths = mediaFiles.map((Element) => {
          return Element.tempFilePath;
        });
        const { photo, video } = await multimediaFormat(
          mediaFiles,
          mimetypes,
          tempFilePaths
        );
        const newPublications = new publications({
          titles: title,
          idUsers: idUser,
          descriptions: description,
          locations: location,
        });

        newPublications.medias.photos.push(...photo);
        newPublications.medias.videos.push(...video);

        await newPublications.save();
        await deletesFiles(tempFilePaths);
        res.status(200).json({ message: "Post created successfully" });
      } else {
        const newPublications = new publications({
          titles: title,
          idUsers: idUser,
          descriptions: description,
          locations: location,
        });
        const { video, photo } = await singlMediaFormat(mediaFiles);
        newPublications.medias.photos.push(...photo);
        newPublications.medias.videos.push(...video);
        await newPublications.save();
        await fs.unlink(mediaFiles.tempFilePath);
        res.status(200).json({ message: "Post created successfully" });
      }
    } else {
      const newPublications = new publications({
        titles: title,
        idUsers: idUser,
        descriptions: description,
        locations: location,
      });
      await newPublications.save();
      return res.json({ message: "Post created successfully" });
    }
  } catch (error) {
    console.error("Error en createPublications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatedPublications = async (req, res) => {
  try {
    const { id } = req.params;
    const { valor } = validatorId(id);
    const { title, description, location } = req.body;
    if (!valor) res.status(404).json({ message: "invalid id" });
    if (!req.file?.media) {
      const publication = await publications.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $Set: {
            titles: title,
            descriptions: description,
            location: location,
          },
        }
        if () {
          
        } else {
          
        }
      );
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};
