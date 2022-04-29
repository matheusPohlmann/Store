using System;
using System.Collections.Generic;
using System.Linq;
using Store.Domain;
using System.Threading.Tasks;

namespace Store.Persistence
{
    public interface IProdutoPersist
    {
        Task<Produto[]> GetAllProdutos();
        Task<Produto> GetProdutosById(int ProdutoId);
    }
}