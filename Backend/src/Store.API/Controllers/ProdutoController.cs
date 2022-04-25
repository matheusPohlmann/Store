using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Store.API.Data;
using Store.API.Models;

namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly DataContext _context;

        public ProdutoController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public IEnumerable<Produto> Get(int id)
        {
            return _context.Produtos;
        }

        [HttpGet("{id}")]
        public Produto GetById(int id)
        {
            return _context.Produtos.FirstOrDefault(prod => prod.Id == id);
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
