using backend.Helpers;
using backend.Middlewares;
using backend.Services;
using backend.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddJwtAuthentication("Sizin128BitlikSecretKey");

builder.Services.AddSingleton<OKXWebSocketService>();
builder.Services.AddSignalR();
builder.Services.AddControllers();

var app = builder.Build();
app.MapHub<MarketHub>("/markethub");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
