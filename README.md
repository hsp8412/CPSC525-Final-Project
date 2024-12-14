# CPSC525 Final Project - CWE-502
## Description
This implementation is a voting system for the 2020 US presidential election, which includes the following components:
- app.py, the web server built with Flask to handle login, vote submission, vote counts retrieval, etc.
- frontend, the frontend of a voting system built with Next.js.
- exploit.py, the exploitation that sends a malicious payload to the server and modify cadidate A's vote count.

In normal circumstances, the frontend make the api call to "/vote/submit" with the serialized data. The server deserialize it with pickle and add the vote to the corresponding candidate. However, since pickle has the vulnerability to execute arbitrary code during the deserialization process, a user can send a malicious payload to the endpoint and manipulate the vote count.

## Installation Instructions
After cloning the repository, run the following command to set up the project:

```
./setup.sh
```