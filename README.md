# Summary:

Based on a CV and template uploads, generates a report with the CV document following the report template (uses OpenAI's API for that)

# Run:

after downloading the repo, create a `.env` in the `/backend` dir, containing your OpenAI API key as:

```
OPENAI_API_KEY=your_api_key
```

and run in the root directory of the project:

```
make build
make start
```
