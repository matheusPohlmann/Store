using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Application.Dtos
{
    public class ProdutoDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double FinalPrice { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
    }
}