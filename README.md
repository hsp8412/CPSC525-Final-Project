# CPSC525 Final Project - CWE-502
## Description
This implementation is a voting system for the 2020 US presidential election, which includes the following components:
- `app.py`, the web server built with Flask to handle login, vote submission, vote counts retrieval, etc.
- `/frontend`, the frontend of a voting system built with Next.js.
- `exploit1.py`, the exploitation that sends a malicious payload to the server and modify cadidate A's vote count.
- `exploit2.py`, the exploitation that sends a malicious payload to the server and make a system call to modify file at server.

In normal circumstances, the frontend makes the api call to `/vote/submit` with the serialized data. The server deserialize it with pickle and add the vote to the corresponding candidate. However, since pickle has the vulnerability to execute arbitrary code during the deserialization process, a user can send a malicious payload to the endpoint and manipulate the vote count.

## Installation Instructions
After cloning the repository, run the following command to set up and run the project:

```
./setup.sh
```

This script will automatically set up a Python virtual environmnet with specific dependencies listed in `requirements.txt` for our backend. After it set up, the `setup.sh` will then trigger the execiton `run.sh` which runs the backend and frontend programs and opens up the browser to show the login page.

User can login with the following hardcoded crednetials:
```
{SSN: 123456789, password: password}, or
{SSN: 987654321, password: password}
```

Users can check the votes of the two candidates and submit their own votes. **All users can only vote once.** 

## Exploitation 1
However, attackers can run the script
```
./exploit1.sh
```
which runs the `exploit1.py` to exploit the vulnerability on the webpage which uses `pickle` in Python language during the **deserialization** process.

The script calls the login endpoint with a valid credential and get a valid token from the server. It then sends a malicious payload **serialized** by `pickle` which includes command to change the vote count for the candidate A to `49900`, and give a great advantage to candidate A.

## Exploitation 2
Furthermore, attackers can exploit this vulnerability to make system call from the server by runing the follwoing script
```
./exploit2.sh
```
In this exploitation, the attacker can make use of this vulnerability of `pickle` **deserialization** to make system calls and mainpulate files in the server's file system. In our case, a **top secret** is stored in `secret.txt`, and the attacker overwrites it with a arbitrary contents, which can have severe consequences. 