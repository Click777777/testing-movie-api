module.exports = () => {
  if (!process.env.jwtPrivateKey) {
    throw new Error("FATAL ERROR : jwt_private_key is required");
  }
};
