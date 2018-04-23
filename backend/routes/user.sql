-- BLOCK getAllClassRecord
SELECT
  *
FROM
  classInfo;

-- BLOCK getClassRecord
SELECT class
FROM classInfo
WHERE class = :u_class;

-- BLOCK create_user
INSERT INTO user (name, email, password, year, direction, avatar)
SELECT * FROM (SELECT :u_name, :u_email, :u_password, :u_year, :u_direction, :u_avatar) AS temp
WHERE NOT EXISTS (
  SELECT email FROM user WHERE email = :u_email
) LIMIT 1;

-- BLOCK check_user_email
SELECT
  email
FROM
  user
WHERE
  email = :u_email;

-- BLOCK find_user_password
SELECT
  *
FROM
  user
WHERE
  email = :u_email;

-- BLOCK get_goals
SELECT message FROM rightEvent WHERE email = :u_email;

-- BLOCK deleteRow
DELETE FROM rightEvent
WHERE email = :u_email AND message = :u_message;

-- BLOCK insertRightEvent
INSERT INTO rightEvent (email, message)
VALUES (:u_email, :u_message);

-- BLOCK update_user_setting
UPDATE
  user
SET
  year = :u_year,
  direction = :u_direction
WHERE
  email = :u_email;

-- BLOCK getUserTakenClass
SELECT *
FROM enroll
WHERE email = :u_email

-- BLOCK addClass
INSERT INTO enroll (email, class, gpa)
VALUES (:u_email, :u_class, :u_gpa);

-- BLOCK getTrackClass
SELECT class
FROM trackClass
WHERE track = :u_track

-- BLOCK getTrackAvgGPA
SELECT t.track, AVG(e.gpa)
FROM trackClass t, enroll e
WHERE t.class = e.class
GROUP BY t.track

-- BLOCK getAllUserAvgGPA
SELECT u.email, AVG(e.gpa)
FROM user u, enroll e
WHERE u.email = e.email
GROUP BY u.email
