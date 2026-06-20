# Cloudinary Upload Service

## Setup

npm install
npm run dev

## Environment Variables

See .env.example

## Upload Endpoint

POST /api/upload

Form-data:
file: image file

## CURL Example

curl -X POST http://localhost:5000/api/upload -F "file=@image.jpg"