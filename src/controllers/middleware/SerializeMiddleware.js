class SerializeMiddleware {
  static json(req, res, next) {
    // const accept = req.getHeader('Accept');

    // if (accept.indexOf('application/json') === -1 
    //   || accept.indexOf(`*/*`) === -1) {
    //     return res.status(406).end();
    // }
    
    res.set({'Content-Type': 'application/json'});
    
    next();
  }
}

module.exports = SerializeMiddleware;