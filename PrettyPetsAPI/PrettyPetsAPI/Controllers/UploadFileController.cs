using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace PrettyPetsAPI.Controllers
{
    [Route("api/[controller]")]
    public class UploadFileController : Controller
    {
        private readonly PetDbContext _context;

        public UploadFileController(PetDbContext context)
        {
            _context = context;
        }
        
    }
}
