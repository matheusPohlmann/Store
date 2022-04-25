using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Store.API.Models;

namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {

        public IEnumerable<Produto> _produto = new Produto[] {
            new Produto() {
                Id = 1,
                Name = "Caneca preta",
                Description = "Esta é uma caneca preta",
                Price = 25.5,
                ImageURL = "image.png"
            },
            new Produto() {
                Id = 2,
                Name = "Caneca vermelha",
                Description = "Esta é uma caneca vermelha",
                Price = 26.75,
                ImageURL = "image2.png"
            }
                
        };

        public ProdutoController()
        {
            
        }

        [HttpGet]
        public IEnumerable<Produto> Get(int id)
        {
            return _produto;
        }

        [HttpGet("{id}")]
        public IEnumerable<Produto> GetById(int id)
        {
            return _produto.Where(prod => prod.Id == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de Put com id = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo de Delete com id = {id}";
        }

    }
}
