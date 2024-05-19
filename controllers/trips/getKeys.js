const getKeys = (req, res) => {
  const REACT_APP_PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
  const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  res.status(200).json({
    publicKey: REACT_APP_PUBLIC_KEY,
    secretKey: REACT_APP_SECRET_KEY,
  });
};

module.exports = getKeys;
