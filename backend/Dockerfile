# .NET 7.0 SDK base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Çalışma dizinini oluşturuyoruz
WORKDIR /app

# Proje dosyasını kopyalıyoruz
COPY ./*.csproj ./

# Gerekli bağımlılıkları yüklüyoruz
RUN dotnet restore

# Uygulamanın geri kalanını kopyalıyoruz
COPY . ./

# Uygulamayı yayın (publish) modunda derliyoruz
RUN dotnet publish -c Release -o out

# Çalıştırmak için runtime image kullanıyoruz
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Uygulama dosyalarını kopyalıyoruz
WORKDIR /app
COPY --from=build /app/out .

# Uygulamanın çalışması için gerekli portu açıyoruz
EXPOSE 80

# Uygulamayı çalıştırıyoruz
ENTRYPOINT ["dotnet", "backend.dll"]