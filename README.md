# Weekly Progress Log

## Date & Hours Log
| Date               | Hours Spent  | Subject(s)                         | Output/Progress |
|--------------------|--------------|------------------------------------|-----------------|
| 5 Nov 2024         | 5 hours      | Watching lecture, Git assignment   | Completed the Git assignment successfully. |
| 6 Nov - 16 Nov 2024 | 10 hours     | Watching lectures, Exploring PortSwigger labs | Completed PortSwigger exercises and learned vulnerability analysis techniques. |
| 17 Nov 2024        | 5 hours      | Watching lecture, PortSwigger       | Completed 3 labs and made progress toward understanding web vulnerabilities. |
| 18 Nov - 23 Nov 2024 | 15 hours    | Database design, watching lecture  | Designed initial database schema, linked database successfully, but faced registration issues on the login page. |
| 24 Nov 2024        | 13 hours     | Watching lecture                    | Created database and established database link successfully, but registration issue persisted. |
| 25 Nov 2024        | 12 hours     | Watching lecture                    | Re-created database and resolved database connection issue but encountered errors in logic. |
| 26 Nov 2024        | 11 hours     | Watching lecture                    | Re-created database schema again and rewrote logic from scratch to ensure a clean codebase. |
| 27 Nov 2024        | 5 hours      | Watching lecture                    | Conducted testing, resolved Git upload issues, prepared and finalized the report, and successfully submitted the assignment. |
| 5 Dec 2024         | 5 hours      | ZAP Report 1                         | Generated initial ZAP report findings. |
| 6 Dec 2024         | 5 hours      | ZAP Report 2                         | Resolved reported issues and performed additional security analysis. |

## Reports & Work Summary
### Report 1
- [Link to first ZAP scan report](https://github.com/TahbirMoon/ideal-succotash/blob/main/first%20test-ZAP-Report-.md)  
  - This report includes initial findings and a summary of identified vulnerabilities.
---

### Report 2
- [Link to second ZAP scan report](https://github.com/TahbirMoon/ideal-succotash/blob/main/my%202nd%20test%20zap%20report.md)  
  - This report includes fixes and further analysis performed after addressing vulnerabilities and implementing necessary mitigations.

---

## Summary of Changes Between Reports
Between the two reports, the following key activities were performed:
- **5 Dec 2024:** Initial report findings were documented and shared, including an investigation into potential issues within the code.  
- **6 Dec 2024:** Resolved SQL Injection risk and implemented error handling adjustments, refined CSP header settings, and addressed minor server response issues.

---

## Recommendations
- Address SQL Injection vulnerabilities by implementing strict server-side validation and using parameterized queries.
- Restrict CSP settings properly to ensure only trusted sources are permitted to load resources.
- Implement custom error pages to minimize the risk of leaking sensitive server details through error responses.
- Ensure the X-Content-Type-Options: nosniff header is configured for all HTTP responses to prevent MIME-sniffing attacks.
- Remove unnecessary comments from the application code and server responses to minimize information disclosure risks.
