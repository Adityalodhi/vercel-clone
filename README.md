﻿
# Vercel Clone

This project aims to replicate the core functionality of Vercel using AWS S3, Redis, and TypeScript to host React websites. The application is divided into three main services:

1. Upload Service: Clones a GitHub repository into an S3 bucket and queues the repository ID in Redis.

2. Deployment Service: Builds the cloned repository into HTML, CSS, and JS files, and uploads the built code back to the S3 bucket.

3. Request Server: Handles requests for specific URLs, retrieves the project ID from Redis, and renders the HTML pages from the S3 bucket.


## digrams

![vercel1](https://github.com/Adityalodhi/vercel-clone/assets/106116888/36530f57-e404-4a29-938c-bad84fc92950)

![vercel2](https://github.com/Adityalodhi/vercel-clone/assets/106116888/fe10c822-0565-4b46-bd80-dfdc9c85a5c4)



## Steps

1. Upload Service
This service takes a GitHub URL as input, clones the repository into an S3 bucket, and sends the repository ID to a Redis queue.

Steps:

    a. Accept GitHub URL input.
    b. Clone the repository.
    c. Upload the repository to an S3 bucket.
    d. Generate a unique ID for the repository.
    e. Store the ID in a Redis queue.
    f. Set the status in Redis as "uploaded".

2. Deployment Service
This service processes the queue, builds the React repository into HTML, CSS, and JS, and uploads the built code back to the S3 bucket.

Steps:

    a. Fetch the repository ID from the Redis queue.
    b. Build the React repository.
    c. Upload the built code to the S3 bucket.
    d. Update the status in Redis to "deployed".

3. Request Server
This server handles requests for the particular URL, fetches the project ID from Redis, and renders the HTML pages from the S3 bucket.

Steps:

    a. Fetch the project ID from Redis.
    b. Retrieve the HTML pages from the S3 bucket.
    c. Serve the HTML pages.
## Prerequisites

Before running this project, ensure you have the following installed:

    Node.js
    AWS CLI configured with appropriate permissions
    Redis server
    Git
## Contributing


This project, originally made by Harkirat Singh, aims to replicate the core functionality of Vercel using AWS S3, Redis, and TypeScript to host React websites. Modifications have been made to use Amazon S3 buckets instead of Cloudflare for storing the objects.
