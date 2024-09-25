import mongoose from "mongoose";
import { publications } from "../models/publications.model.js";
import { deletesFiles } from "../utils/deletePath.js";
import {
  multimediaFormat,
  singlMediaFormat,
} from "../utils/savePublications.js";
import fs from "fs-extra";

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
    const { id } = req.params;
    const publicationsSearched = await publications.findById(id)
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

export const updatePublications = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location } = req.body;
    
    const valor = mongoose.Types.ObjectId.isValid(id);

    if (!valor) res.status(404).json({ message: "invalid id" });
    
    const publication = await publications.findById(id);
    
    
    if (req.files?.media) {
      const media = req.files.media;
      const valid = Array.isArray(media);
      if (!valid) {
        const {video,photo}= await singlMediaFormat(media);
        console.log(publication.medias);
        publication.medias.photos.push(...photo);
        publication.medias.videos.push(...video);
        console.log(publication.medias);
        
        


      } else {
        const type = media.map(e=>{
          return e.mimetype
        })
        const path = media.map(e=>{
          return e.tempFilePath
        })
        const { photo, video } = await multimediaFormat(media,type,path)
        photo.forEach(async(e)=>{
        await publications.findByIdAndUpdate(id,{$push:{'medias.photos':{ _id: e._id , url: e.url}}},{new:true})
        }
      );
      video.forEach(async(e)=>{
        await publications.findByIdAndUpdate(id,{$push:{'medias.videos':{_id: e._id, url: e.url }}},{new:true})
      });
      const publicationUpdate = await publications.findByIdAndUpdate(id,
        {$set:{
          titles:title,
          descriptions:description,
          locations:location
        }},{new:true}
      )
      console.log(publicationUpdate);
      
      }
      } else {
      await publications.findByIdAndUpdate(
        id,
        {
          $set: {
            titles: title,
            descriptions: description,
            locations: location,
          },
        },
        { new: true }
      );
      return res.json({
        message:'publication updated successfully'
      })
    } 
  } catch (error) {
    console.log(error);
  }
};
