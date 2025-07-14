exports.checkBody = (req) => {
  if (req) {
    for (let field in req.body) {
      if (req.body[field].trim() == "") {
        return { missing: true, fieldName: field };
      }
    }
    return false;
  }
};
