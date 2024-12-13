using backend.Models;
using backend.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static List<User> users = new List<User>();

        // Register endpoint (Basit bir kullanıcı kaydı)
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            // Kullanıcı adı zaten alınmış mı kontrol et
            if (users.Any(u => u.Username == user.Username))
            {
                return BadRequest("Username is already taken");
            }

            users.Add(user); // Kullanıcıyı listeye ekle
            return Ok("User registered successfully");
        }

        // Login endpoint
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            // Kullanıcıyı kontrol et
            var existingUser = users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);
            if (existingUser == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // JWT Token oluştur
            var token = JwtHelper.GenerateToken(user.Username);
            return Ok(new { Token = token });
        }
    }
}