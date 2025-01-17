const multer = require("multer");
const path = require("path");
const firebaseConfig = require("../config/firebase.config");
//console.log(firebaseConfig);
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

//set storage
const storage = multer.diskStorage({
  destination: "./upload/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limit: { fileSize: 100000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  const fileType = /jpeg||jpg||png||git||webp/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error : image Only!!");
  }
}

//upload file to firebase
async function uploadToFirebase(req, res, next) {
  if (!req.file) {
    // return res.status(400).json({ message: "image is required" });
    next();
    return;
  }
  const storageRef = ref(firebaseStorage, `upload/phubate/${req.file.originalname}`);
  // meta data file type
  const metadata = {
    contentType: req.file.mimetype,
  };
  try {
    //uploading file to firebase
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //get file url from firebase
    req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
    next();
    return;
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Something went wrong while uploading image to firebase",
    });
  }
}
// async function uploadToFirebase(req, res, next) {
//   if (!req.file) {
//     // return res.status(400).json({ message: "image is required" });
//     next();
//   }else{
//     const storageRef = ref(firebaseStorage, `upload/${req.file?.originalname}`);
//   // meta data file type
//   const metadata = {
//     contentType: req.file?.mimetype,
//   };
//   try {
//     //uploading file to firebase
//     const snapshot = await uploadBytesResumable(
//       storageRef,
//       req.file?.buffer,
//       metadata
//     );
//     //get file url from firebase
//     req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
//     next();
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error.message ||
//         "Something went wrong while uploading image to firebase",
//     });
//   }
//   }
  
// }

module.exports = { upload, uploadToFirebase };
