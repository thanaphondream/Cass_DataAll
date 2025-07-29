# ใช้ Node.js เป็น base image
FROM node:16

# สร้างไดเรกทอรีสำหรับแอปพลิเคชัน
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

COPY . .

# สร้าง build สำหรับ TypeScript
RUN npm run build


EXPOSE 4002

# รันแอปพลิเคชัน
CMD ["npm", "run", "dev"]