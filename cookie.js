const jwt = require('jsonwebtoken')
module.exports = {
    generateToken: (res, id) => {
        const expiration = 604800000;
        const token = jwt.sign({ id }, 'JWT_SECRET', {
          expiresIn: '7d',
        })
        return res.cookie('token', token, {
          expires: new Date(Date.now() + expiration),
          secure: false, // set to true if your using https
          httpOnly: true,
        })
    },
    verifyToken : async (req, res, next) => {
        const token = req.cookies.token || '';
        try {
          if (!token) {
            return res.status(401).json('Для использования данной функции необходимо авторизироватьсяы')
          }
          const decrypt = await jwt.verify(token, 'JWT_SECRET');
          //console.log(decrypt.id + ' ' + decrypt + ' ' + token);
          req.user = {
            id: decrypt.id,
          };
          next();
        } catch (err) {
          return res.status(500).json(err.toString());
        }
    },
    getToken : async (req, res, next) => {
      const token = req.cookies.token || '';
      try {
        if (!token) {
          return next();
        }
        const decrypt = await jwt.verify(token, 'JWT_SECRET');
        //console.log(decrypt.id + ' ' + decrypt + ' ' + token);
        req.user = {
          id: decrypt.id,
        };
        next();
      } catch (err) {
        return res.status(500).json(err.toString());
      }
  },
  clearToken: (res) => {
    return res.cookie('token', '', {
      expires: new Date(),
      secure: false, // set to true if your using https
      httpOnly: true,
    })
  }
}