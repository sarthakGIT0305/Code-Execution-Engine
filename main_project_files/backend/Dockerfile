# Use official Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy project files to /app
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Start the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
