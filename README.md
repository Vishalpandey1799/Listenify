# Listenify

| Action               | API Endpoint                        | Why it's separate             |
| -------------------- | ----------------------------------- | ----------------------------- |
| Send Request         | `POST /friend-request/:id`          | Clearly sending a new request |
| Cancel Request       | `DELETE /friend-request/:id/cancel` | Only sender can do this       |
| Reject Request       | `DELETE /friend-request/:id/reject` | Only receiver can do this     |
| Accept Request       | `POST /friend-request/:id/accept`   | Only receiver can do this     |
| Get Pending Requests | `GET /friend-request/pending`       | Separate for UI efficiency    |
