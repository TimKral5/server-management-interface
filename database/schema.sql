DROP DATABASE IF EXISTS smi;
CREATE DATABASE smi;
USE smi;

-- Tables
--

CREATE TABLE auth_users (
   user_id           INT UNSIGNED   AUTO_INCREMENT    ,
   user_namehash     TEXT(256)      NOT NULL          ,
   user_pwhash       TEXT(256)      NOT NULL          ,
   user_created_on   DATETIME       NOT NULL          ,

   PRIMARY KEY (user_id)
);

CREATE TABLE auth_challenges (
   challenge_id            INT UNSIGNED   AUTO_INCREMENT    ,
   challenge_token         TEXT(256)      NOT NULL          ,
   challenge_created_on    DATETIME       NOT NULL          ,
   challenge_deleted_on    DATETIME                         ,

   PRIMARY KEY (challenge_id)
);

CREATE TABLE auth_session (
   session_id           INT UNSIGNED   AUTO_INCREMENT    ,
   session_token        TEXT(256)      NOT NULL          ,
   session_created_on   DATETIME       NOT NULL          ,
   session_deleted_on   DATETIME                         ,
   fk_session_user_id   INT UNSIGNED   NOT NULL          ,

   PRIMARY KEY (session_id),
   FOREIGN KEY (fk_session_user_id)
      REFERENCES auth_users (user_id)
);

-- Stored Procedures
--

-- Create Entries
DELIMITER //
CREATE PROCEDURE auth_create_user (
   IN _user_namehash TEXT(256),
   IN _user_pwhash TEXT(256),

   OUT _return_value INT
-- Error Codes:
--   >0: new ID
--   -1: user already exists
)
BEGIN
   SET _return_value = 0;

   SET @user_count = 0;
   SELECT
      @user_count := COUNT(user_id)
   FROM auth_users
      WHERE user_namehash = _user_namehash;

      IF @user_count > 0 THEN
         INSERT INTO auth_users (
         user_namehash,
         user_pwhash
      ) VALUES (
         _user_namehash,
         _user_pwhash
      );
      SET _return_value = LAST_INSERT_ID();
   ELSE
      SET _return_value = -1;
   END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE auth_create_challenge (
   IN _user_namehash TEXT(256),
   IN _user_pwhash TEXT(256),

   OUT _return_value INT
-- Error Codes:
--   >0: new ID
--   -1: user already exists
)
BEGIN
   SET _return_value = 0;


END//
DELIMITER ;