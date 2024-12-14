using backend.Helpers;
using backend.Middlewares;
using backend.Services;
using backend.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;


var builder = WebApplication.CreateBuilder(args);

// CORS Servisini ekle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder
            .WithOrigins("http://localhost:5173")  // Frontend uygulamanızın URL'sini buraya yazın
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

builder.Services.AddJwtAuthentication("Sizin128BitlikSecretKey");

builder.Services.AddSingleton<OKXWebSocketService>();
builder.Services.AddSignalR();
builder.Services.AddControllers();

var app = builder.Build();
app.MapHub<MarketHub>("/markethub");

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowLocalhost");

app.MapControllers();

app.Run();
