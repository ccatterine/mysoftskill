DROP TABLE IF EXISTS USER;
CREATE TABLE USER
(
  userId       INT UNSIGNED NOT NULL AUTO_INCREMENT,
  firstName    VARCHAR(50)  NOT NULL,
  lastName     VARCHAR(50)  NOT NULL,
  userImage    VARCHAR(50)  NOT NULL,
  email        VARCHAR(200) NOT NULL,
  token        VARCHAR(200) NOT NULL,
  gender       CHAR(1)      NOT NULL,
  studyCycleId INT,
  password     VARCHAR(50)  NOT NULL,
  creationDate TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (userId),
  UNIQUE KEY USER (email, token)
)
  ENGINE = INNODB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;
CREATE UNIQUE INDEX table_name_email_uindex
  ON USER (email);

# CREATE TABLE STUDY_CYCLE
# (
#   studyCycleId   INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
#   studyCycleName VARCHAR(50)     NOT NULL,
#   creationDate   DATETIME        NOT NULL,
#   updateDate     DATETIME        NULL
# );
#
#

DROP TABLE IF EXISTS CAREER;
CREATE TABLE CAREER
(
  careerId     INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  careerName   VARCHAR(50)     NOT NULL,
  creationDate TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

DROP TABLE IF EXISTS COMPETITION;
CREATE TABLE COMPETITION
(
  competitionId    INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  careerId         INT             NOT NULL,
  competitionName  VARCHAR(100)    NOT NULL,
  competitionImage TEXT            NOT NULL,
  advice           VARCHAR(2000)   NOT NULL,
  creationDate     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  CONSTRAINT careerId_carrer_fk FOREIGN KEY (careerId) REFERENCES CAREER (careerId)
);

DROP TABLE IF EXISTS QUESTIONS;
CREATE TABLE QUESTIONS
(
  questionId    INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  competitionId INT             NOT NULL,
  questionName  VARCHAR(200)    NOT NULL,
  alt1Name      VARCHAR(200)    NOT NULL,
  alt1Value     INT             NOT NULL,
  alt2Name      VARCHAR(200)    NOT NULL,
  alt2Value     INT             NOT NULL,
  alt3Name      VARCHAR(200)    NOT NULL,
  alt3Value     INT             NOT NULL,
  alt4Name      VARCHAR(200)    NOT NULL,
  alt4Value     INT             NOT NULL,
  creationDate  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  updateDate    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  CONSTRAINT competitionId_competition_fk FOREIGN KEY (competitionId) REFERENCES COMPETITION (competitionId)
);

DROP TABLE IF EXISTS EVALUATION;
CREATE TABLE EVALUATION
(
  evaluationId    INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userId          INT UNSIGNED    NOT NULL,
  totalGoodAnswer INT             NOT NULL,
  updateDate      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  CONSTRAINT evaluation_user_fk FOREIGN KEY (userId) REFERENCES USER (userId)
);
#
/**********************************CRUD FOR USER*********************************/
#GET FRIEND BY USERID
DROP PROCEDURE IF EXISTS sp_GetUserById;
DELIMITER //
CREATE PROCEDURE sp_GetUserById(IN _userId INT)
  BEGIN
    SELECT *
    FROM USER
    WHERE userId = _userId;
  END //
DELIMITER ;

#GET FRIEND BY USERID
DROP PROCEDURE IF EXISTS sp_GetUserByEmail;
DELIMITER //
CREATE PROCEDURE sp_GetUserByEmail(IN _email VARCHAR(50))
  BEGIN
    SELECT *
    FROM USER
    WHERE email = _email;
  END //
DELIMITER ;

#PUT FRIEND BY USERID
DROP PROCEDURE IF EXISTS sp_PutUserById;
DELIMITER //
CREATE PROCEDURE sp_PutUserById(IN _userId INT, IN _firstname VARCHAR(50), IN _lastname VARCHAR(50),
                                IN _email  VARCHAR(50))
  BEGIN
    UPDATE USER
    SET firstName = _firstname,
      lastName    = _lastname,
      email       = _email
    WHERE userId = _userId;
  END //
DELIMITER ;
#
# #UPDATE FOR USER
# DROP PROCEDURE IF EXISTS sp_UpdateUser;
# DELIMITER //
# CREATE PROCEDURE sp_UpdateUser(IN _userId INT,IN _firstName    VARCHAR(50), IN _lastName VARCHAR(50), IN _userProfileImage VARCHAR(200),
#                              IN _email VARCHAR(100), IN _gender CHAR(1), IN _password VARCHAR(50))
#   BEGIN
#   UPDATE  USER
#   SET firstName=_firstName, lastName=_lastName,userProfileImage=_userProfileImage,email=_email,gender=_gender,password=_password
#   WHERE userId=_userId;
#   END //
# DELIMITER ;
# #GET
#

/**********************************CRUD FOR CAREER*********************************/
#GET FRIEND BY USERID
DROP PROCEDURE IF EXISTS sp_GetCareer;
DELIMITER //
CREATE PROCEDURE sp_GetCareer()
  BEGIN
    SELECT *
    FROM CAREER;
  END //
DELIMITER ;

/**********************************CRUD FOR COMPETITIONS*********************************/
#GET COMPETITION BY CAREERID
DROP PROCEDURE IF EXISTS sp_GetCompetitionByCareerId;
DELIMITER //
CREATE PROCEDURE sp_GetCompetitionByCareerId(IN _careerId INT UNSIGNED)
  BEGIN
    SELECT
      co.competitionId,
      co.competitionName,
      co.advice,
      co.competitionImage
    FROM CAREER AS ca
      INNER JOIN COMPETITION AS co
        ON ca.careerId = co.careerId
    WHERE ca.careerId = _careerId;
  END //
DELIMITER ;

#GET QUESTIONS BY COMPETITIONID
DROP PROCEDURE IF EXISTS sp_GetQuestionsByCompetitionId;
DELIMITER //
CREATE PROCEDURE sp_GetQuestionsByCompetitionId(IN _competitionId INT UNSIGNED)
  BEGIN
    SELECT
      qs.questionId,
      qs.questionName,
      qs.alt1Name,
      qs.alt1Value,
      qs.alt2Name,
      qs.alt2Value,
      qs.alt3Name,
      qs.alt3Value,
      qs.alt4Name,
      qs.alt4Value
    FROM COMPETITION AS co
      INNER JOIN QUESTIONS AS qs
        ON co.competitionId = qs.competitionId
    WHERE co.competitionId = _competitionId
    ORDER BY RAND()
    LIMIT 6;
  END //
DELIMITER ;

#
# #GET QUESTIONS WITH ANSWER
# DROP PROCEDURE IF EXISTS sp_GetQuestionsWithAnswer;
# DELIMITER //
# CREATE PROCEDURE sp_GetQuestionsWithAnswer(IN _competencesId INT)
#   BEGIN
#   SELECT COMPETENCES.competencesName,COMPETENCES_QUESTIONS.compQuesName,ANSWER.answerName
#   FROM COMPETENCES
#   INNER JOIN COMPETENCES_QUESTIONS ON COMPETENCES.competencesId=COMPETENCES_QUESTIONS.competencesId
#   INNER JOIN ANSWER ON COMPETENCES_QUESTIONS.competencesQuestionsId=ANSWER.competencesQuestionsId;
#   END //
# DELIMITER ;
# #GET


# INSERT DATA

INSERT INTO USER (firstName, lastName, userImage, email, token, gender, studyCycleId, password, creationDate, updateDate)
VALUES ('edith', 'puclla', 'sadasdsa', 'edit44@outlook.com', 'edith', 3, 1, '123', '01/01/17', '01/01/17');

INSERT INTO CAREER (careerName, creationDate, updateDate) VALUES ('Ingeniería de Sistemas', NULL, NULL);
INSERT INTO CAREER (careerName, creationDate, updateDate) VALUES ('Ingeniería Industrial', NULL, NULL);
INSERT INTO CAREER (careerName, creationDate, updateDate) VALUES ('Ingeniería de Software', NULL, NULL);

INSERT INTO COMPETITION (careerId, competitionName, competitionImage, advice, creationDate, updateDate) VALUES
  (1, 'Adaptabilidad al cambio', 'F:\PROYECTOS\misoftskill\data-competencias\img\adaptabilidad-al-cambio.png',
   'Adaptabilidad al cambio', '2017-05-11 23:01:24', '2017-05-11 23:01:24'),
  (1, 'Autoregulación', 'F:\PROYECTOS\misoftskill\data-competencias\img\autorregulacion.jpg',
   'Compruebe regularmente si entiende correctamente a la otra persona en una conversación.Sea consciente de su uso del lenguaje y el ritmo del habla, y ajustarlos a la persona a la que está hablando.Averigue quién es su público y manténganlo en mente al hablar con ellos.Practicar diferentes estilos de comunicación: convencer, hacer preguntas, explicar, consultar, sugerir, etcétera.',
   '2017-05-11 23:01:24', '2017-05-11 23:01:24'),
  (1, 'Capacidad de influencia', 'F:\PROYECTOS\misoftskill\data-competencias\img\capacidad-de-influencia.jpg',
   'Capacidad de influencia', '2017-05-11 23:01:24', '2017-05-11 23:01:24'),
  (1, 'Comunicación efectiva', 'F:\PROYECTOS\misoftskill\data-competencias\img\comunicacion -efectiva.jpg',
   'Compruebe regularmente si entiende correctamente a la otra persona en una conversación.Sea consciente de su uso del lenguaje y el ritmo del habla, y ajustarlos a la persona a la que está hablando.Averigue quién es su público y manténganlo en mente al hablar con ellos.Practicar diferentes estilos de comunicación: convencer, hacer preguntas, explicar, consultar, sugerir, etcétera.',
   '2017-05-11 23:01:24', '2017-05-11 23:01:24'),
  (1, 'Empatía', 'F:\PROYECTOS\misoftskill\data-competencias\img\empatia.jpg', 'Empatía', '2017-05-11 23:01:24',
   '2017-05-11 23:01:24'),
  (1, 'Pensamiento estratégico', 'F:\PROYECTOS\misoftskill\data-competencias\img\pensamiento-estrategico.jpg',
   'Pensamiento estratégico', '2017-05-11 23:01:24', '2017-05-11 23:01:24');

INSERT INTO QUESTIONS (competitionId, questionName,
                       alt1Name, alt1Value,
                       alt2Name, alt2Value,
                       alt3Name, alt3Value,
                       alt4Name, alt4Value,
                       creationDate, updateDate) VALUES
  (2, 'Me gusta plantearme metas y objetivos en la vida',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Prefiero informarme sobre las distintas opciones laborales antes de elegir',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Sueño sobre cómo será mi vida después de que acabe mis estudios',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Tengo gran confianza en mis decisiones',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Fácilmente puedo admitir públicamente haber cometido un error',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Comúnmente los aspectos personal influyen en mi rendimiento académico',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Siento las emociones de los demás.',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),

  (2, 'No me gusta involucrarme en los problemas de los demás.',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'He ocultado alguna vez misopiniones por miedo a que los demás pudiesen reírse o criticarme',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Generalmente, experimento una sensación de calma interior y satisfacción',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Ignoro  con cierta facilidad los pequeños errores e inexactitudes',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Siento  con frecuencia que no tengo control suficiente del rumbo que esta tomando mi vida',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Generalmente, me siento bastante seguro de mi mismo',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Puedo decir que las preocupaciones raramente me hacen perder el sueño',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Ha llegado usted a sudar y temblar si se ve anbte una tarea difícil?',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Si algo me va mal, lo atribuyo usted habitualmente a la mala suerte mas que a una mala gestión',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Me preocupo bastante a menudo de modo irracional por cosas que no tienen una verdadera importancia',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (2, 'Leo  los horóscopos con la esperanza de obtener indicaciones para mi vida',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (4, 'Tomas la iniciativa en la transmisión de la información, aportando información complementaria y comprobando la efectividad de la misma, solicitando feedback',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (4, 'Expones la información de forma clara y utilizando el lenguaje apropiado',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (4, 'En tus comunicaciones transmites credibilidad, consiguiendo mantener el interés del interlocutor sobre el mensaje',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (4, 'Sueles aportar información relevante y acorde con el las demandas de tu interlocutor',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),

  (4, 'Casi nunca empleo palabras malsonantes en un ambiente social o laboral',
      'No estoy nada de acuerdo', 1,
      'No estoy de acuerdo', 2,
      'Estoy de acuerdo', 3,
      'Estoy totalmente de acuerdo', 4,
      NULL, NULL),
  (4,
    'Soy muy eficaz cuando se trata de persuadir a las personas de que comprendan mi punto de vista o de que hagan lo que yo deseo',
    'No estoy nada de acuerdo', 1,
    'No estoy de acuerdo', 2,
    'Estoy de acuerdo', 3,
    'Estoy totalmente de acuerdo', 4,
    NULL, NULL);

# /**FOR TESTING**/
# ALTER TABLE COMPETITION AUTO_INCREMENT = 1;
# ALTER TABLE career  AUTO_INCREMENT = 1;
# ALTER TABLE career AUTO_INCREMENT = 1;
# ALTER TABLE QUESTIONS AUTO_INCREMENT = 1;
