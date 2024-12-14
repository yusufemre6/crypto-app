# Node.js base image kullanıyoruz
FROM node:18 AS build

# Çalışma dizinini oluşturuyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package.json package-lock.json ./

# Bağımlılıkları yüklüyoruz
RUN npm install

# Uygulamanın tüm dosyalarını kopyalıyoruz
COPY . .

# React uygulamasını build ediyoruz ve çıktıyı ekrana yazdırıyoruz
RUN npm run build && ls -l /app/dist

# Nginx ile statik dosyaları sunuyoruz
FROM nginx:alpine

# React build dosyalarını Nginx'e kopyalıyoruz
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx'in 80 portunu açıyoruz
EXPOSE 80

# Nginx'i başlatıyoruz
CMD ["nginx", "-g", "daemon off;"]
