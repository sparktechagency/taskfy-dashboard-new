# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install deps
COPY ../package*.json ./
RUN npm install

# 4. Copy source code
COPY . .


RUN npm run build

EXPOSE 4173

# 7. Run the server
CMD ["npm", "run", "preview"]
# RUN npm run preview 