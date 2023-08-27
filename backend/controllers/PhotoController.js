const Photo = require("../models/Photo");
const User = require("../models/User");

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  console.log("1 Chegou o title:", title);

  console.log("2 Chegou a imagem:", image);

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  console.log("3 Chegou o user:", user);

  //   Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  console.log("4 Chegou a newPhoto:", newPhoto);

  //   If photo has been created successfully then return data
  if (!newPhoto) {
    console.log("5 Caiu no !newPhoto");
    res.status(422).json({
      errors: ["An error ocurred, please try again later."],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

// Remove photo from db
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;
  try {
    const photo = await Photo.findById(id);
    if (!photo) {
      res.status(404).json({ errors: ["Photo not found!"] });
      return;
    }

    //   Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["An error ocurred, please try again later."] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo._id, message: "Photo deleted successfully." });
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }
};

// Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  console.log("1 - getUserPhotos id: ", id);
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  console.log("2 - getUserPhotos: ", photos);
  return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Photo not found."] });
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found."] });
    return;
  }
};

// Update photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);
    // Check if photo exist
    if (!photo) {
      res.status(404).json({ errors: ["Photo not found."] });
      return;
    }

    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["An error ocurred, please try again later."] });
      return;
    }

    // Check if title has arrived
    if (title) {
      photo.title = title;
    }

    // Return 200 if everything is ok
    await photo.save();
    res.status(200).json({ photo, message: "Photo updated successfully." });
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found."] });
    return;
  }
};

// Like functionality
const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);
    if (!photo) {
      res.status(404).json({ errors: ["Photo not found"] });
      return;
    }
    // Check if user already liked the photo
    if (photo.likes.includes(reqUser._id)) {
      rex.status(422).json({ errors: ["You already liked this photo."] });
      return;
    }

    // Put user id in likes array
    photo.likes.push(reqUser._id);

    // Return 200 if everything is ok
    await photo.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: "Photo was Liked",
    });
  } catch (error) {
    res
      .status(404)
      .json({ errors: ["An error ocurred, please try again later."] });
    return;
  }
};

// Comment functionality
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  console.log("ID: ", id);
  console.log("COMMENT: ", comment);
  console.log("REQ.USER: ", reqUser);
  try {
    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Photo not found."] });
      return;
    }

    // If photo exist, insert comment in array comments
    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "Comment has been added successfully!",
    });
  } catch (error) {
    res
      .status(404)
      .json({ errors: ["An error ocurred, please try again later."] });
    return;
  }
};

// Search photos by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  try {
    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

    res.status(200).json(photos);
    return;
  } catch (error) {
    res
      .status(404)
      .json({ errors: ["An error ocurred, please try again later."] });
    return;
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
