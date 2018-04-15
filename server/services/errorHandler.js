exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch((e) => { console.log('Error catched', e); next(); });
