const control = require('../../permission/AccessControl');
const grants = require('../../permission/methods');

class AuthorizationMiddleware {
  static permission(entity, action) {
    return (req, res, next) => {
      try {
        const permissionOfResponsibility = control.can(req.user.permission);
        const actions = grants.methods[action];
        const permissionAny = permissionOfResponsibility[actions.any](entity);
        const permissionOwn = permissionOfResponsibility[actions.own](entity);
        if (!permissionAny.granted && !permissionOwn.granted) {
            return res.status(403).end();
        }

        req.access = {
          any: {
           allowed: permissionAny.granted,
           attributes: permissionAny.attributes, 
          },
          own: {
            allowed: permissionOwn.granted,
            attributes: permissionOwn.attributes, 
           },
        };

        next();
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
}

module.exports = AuthorizationMiddleware;