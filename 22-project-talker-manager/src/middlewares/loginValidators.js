const HTTP_BAD_REQUEST = 400;

const validationMessages = {
  emailNotFormatted: 'O "email" deve ter o formato "email@email.com"',
  missingEmail: 'O campo "email" é obrigatório',
  missingPassword: 'O campo "password" é obrigatório',
  shortPassword: 'O "password" deve ter pelo menos 6 caracteres',
};

function emailValidator(req, res, next) {
  const { email } = req.body;
  const REGEX = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingEmail });
  }
  if (!REGEX.test(email)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.emailNotFormatted });
  }

  next();
}

function passwordValidator(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingPassword });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.shortPassword });
  }

  next();
}

module.exports = {
  emailValidator,
  passwordValidator,
};