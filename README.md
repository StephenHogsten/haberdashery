## Running

- start Next: `yarn dev`
- start Redis: `yarn redis`
  - **_note_**: I tried to run with concurrently but docker didn't like it
  - **_note_**: the data isn't actually persisting at the moment after I stop it

## Notable endpoints

- `/api/catchup`: based on the last timestamp stored (or 24 hours by default), update statuses
  - at this point could just run manually each day or so
  - can pass values in with commenting
  - will update redis theoretically
- `/api/redis`: check what's currently stored
- `/api/test`: for messing aroudn with whatever
- `/api/query`: basically also for messing around with whatever at this point
- `/api/backfill`: used for populating all icons based on creation time. Probably wouldn't need it again
- `/list`: originally planned this for a better GTD interface, this was the beginnings there

## TODO

- deploy
  - autodeploy on updates to main (likely GH actions)
- testing
  - require passing tests before deploy
- rework into layers
- ignore icons that aren't in our auto list (i.e. prevent grocery updates)
- could run both with docker and startup with docker compose
- could have a docker-compose volume
- handle more databases (e.g. article status)
