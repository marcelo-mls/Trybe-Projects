const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validationMessages = {
  missingToken: 'Token não encontrado',
  invalidToken: 'Token inválido',
  missingName: 'O campo "name" é obrigatório',
  shortName: 'O "name" deve ter pelo menos 3 caracteres',
  missingAge: 'O campo "age" é obrigatório',
  majority: 'A pessoa palestrante deve ser maior de idade',
  missingTalk: 'O campo "talk" é obrigatório',
  missingWatchedAt: 'O campo "watchedAt" é obrigatório',
  WatchedAtNotFormatted: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  missingRate: 'O campo "rate" é obrigatório',
  invalidRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

function tokenValidator(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: validationMessages.missingToken });
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: validationMessages.invalidToken });
  }

  next();
}

function nameValidator(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingName });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.shortName });
  }

  next();
}

function ageValidator(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingAge });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.majority });
  }

  next();
}

function talkValidator(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingTalk });
  }

  next();
}

function watchedAtValidator(req, res, next) {
  const { talk } = req.body;
  // https://pt.stackoverflow.com/questions/130541/regex-para-validar-data-yyyy-mm-dd
  const REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!talk.watchedAt) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingWatchedAt });
  }
  if (!REGEX.test(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.WatchedAtNotFormatted });
  }

  next();
}

function rateValidator(req, res, next) {
  const { talk } = req.body;

  if (talk.rate === undefined) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.missingRate });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST).json({ message: validationMessages.invalidRate });
  }

  next();
}

module.exports = {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
};