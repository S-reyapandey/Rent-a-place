//import jwt from "jsonwebtoken";
// import admin from "../firebaseAdmin.js";

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided.",
//       });
//     }
//     let firebaseToken = false;
//     try {
//       const decodedToken = await admin.auth().verifyIdToken(token);
//       req.user = {
//         id: decodedToken.uid,
//         name: decodedToken.name || decodedToken.email,
//         photoURL: decodedToken.picture,
//         role: "basic",
//       };
//       firebaseToken = true;
//     } catch (error) {
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = {
//         id: decodedToken.id,
//         name: decodedToken.name,
//         photoURL: decodedToken.photoURL,
//         role: decodedToken.role,
//       };
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       success: false,
//       message: "Something is wrong with your authorization!",
//     });
//   }
// };

// export default auth;

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const googleToken = token.length > 1000;
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoURL: payload.picture,
        role: 'basic',
      };
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name, photoURL, role } = decodedToken;
      req.user = { id, name, photoURL, role };
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Something is wrong with your authorization!',
    });
  }
};

export default auth;